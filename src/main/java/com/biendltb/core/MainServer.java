/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.biendltb.core;

import com.biendltb.controller.IndexServlet;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.tomcat.InstanceManager;
import org.apache.tomcat.SimpleInstanceManager;
import org.eclipse.jetty.annotations.ServletContainerInitializersStarter;
import org.eclipse.jetty.apache.jsp.JettyJasperInitializer;
import org.eclipse.jetty.jsp.JettyJspServlet;
import org.eclipse.jetty.plus.annotation.ContainerInitializer;
import org.eclipse.jetty.server.ConnectionFactory;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.ServerConnector;
import org.eclipse.jetty.servlet.DefaultServlet;
import org.eclipse.jetty.servlet.ServletHolder;
import org.eclipse.jetty.util.log.JavaUtilLog;
import org.eclipse.jetty.util.log.Log;
import org.eclipse.jetty.util.thread.QueuedThreadPool;
import org.eclipse.jetty.webapp.WebAppContext;

/**
 *
 * @author biendltb
 * @email biendltb@gmail.com
 * @version 1.0
 */
public class MainServer {
    
    // Resource path pointing to where the WEBROOT is
    private static final String WEBROOT_INDEX = "/webroot/";
    
    private static final Logger LOG = Logger.getLogger(MainServer.class.getName());

    private final int port;
    private final String host;
    private Server server;
    private URI serverURI;
    
    public MainServer(int port, String host) {
        this.port = port;
        this.host = host;
    }
    
    public URI getServerURI() {
        return serverURI;
    }
    
    public static void main(String[] args) throws Exception {
        
        // Set config file
        Registry.init("server.properties");
        
        // log
        LoggingUtil.config();
        Log.setLog(new JavaUtilLog());
        
        // config thread pool
        QueuedThreadPool threadPool = new QueuedThreadPool();
        threadPool.setMinThreads(10);
        threadPool.setMaxThreads(1000);
        
        int port = Integer.parseInt(Registry.get("port"));
        String host = Registry.get("host");
        
        MainServer main_server = new MainServer(port, host);
        main_server.start(threadPool);
        main_server.waitForInterrupt();
    }
    
    public void start(QueuedThreadPool thread_pool) throws Exception {
        server = new Server(thread_pool);
        ServerConnector connector = connector();
        server.addConnector(connector);

        URI baseUri = getWebRootResourceUri();

        // Set JSP to use Standard JavaC always
        System.setProperty("org.apache.jasper.compiler.disablejsr199", "false");

        WebAppContext webAppContext = getWebAppContext(baseUri, getScratchDir());

        server.setHandler(webAppContext);

        // Start Server
        server.start();

        // Show server state
        if (LOG.isLoggable(Level.FINE)) {
            LOG.fine(server.dump());
        }
        this.serverURI = getServerUri(connector);
    }

    private ServerConnector connector() {
        ServerConnector connector = new ServerConnector(server);
        connector.setPort(port);
        connector.setHost(host);
        return connector;
    }
    
    private URI getWebRootResourceUri() throws FileNotFoundException, URISyntaxException {
        URL indexUri = this.getClass().getResource(WEBROOT_INDEX);
        if (indexUri == null) {
            throw new FileNotFoundException("Unable to find resource " + WEBROOT_INDEX);
        }
        // Points to wherever /webroot/ (the resource) is
        return indexUri.toURI();
    }
    
    /**
     * Establish Scratch directory for the servlet context (used by JSP
     * compilation)
     */
    private File getScratchDir() throws IOException {
        File tempDir = new File(System.getProperty("java.io.tmpdir"));
        File scratchDir = new File(tempDir.toString(), "embedded-jetty-jsp");

        if (!scratchDir.exists()) {
            if (!scratchDir.mkdirs()) {
                throw new IOException("Unable to create scratch directory: " + scratchDir);
            }
        }
        return scratchDir;
    }
    
    /**
     * Setup the basic application "context" for this application at "/" This is
     * also known as the handler tree (in jetty speak)
     */
    private WebAppContext getWebAppContext(URI baseUri, File scratchDir) {
        WebAppContext context = new WebAppContext();
        context.setContextPath("/");
        context.setAttribute("javax.servlet.context.tempdir", scratchDir);
        context.setAttribute("org.eclipse.jetty.server.webapp.ContainerIncludeJarPattern",
                ".*/[^/]*servlet-api-[^/]*\\.jar$|.*/javax.servlet.jsp.jstl-.*\\.jar$|.*/.*taglibs.*\\.jar$");
        context.setResourceBase(baseUri.toASCIIString());
        context.setAttribute("org.eclipse.jetty.containerInitializers", jspInitializers());
        context.setAttribute(InstanceManager.class.getName(), new SimpleInstanceManager());
        context.addBean(new ServletContainerInitializersStarter(context), true);
        context.setClassLoader(getUrlClassLoader());

        context.addServlet(jspServletHolder(), "*.jsp");

        // add resource holder
        ServletHolder assetsHolder = context.addServlet(org.eclipse.jetty.servlet.DefaultServlet.class, "/assets/*");
        assetsHolder.setInitParameter("resourceBase", "./src/main/resources/assets");
        assetsHolder.setInitParameter("pathInfoOnly", "true");

        context.addServlet(new ServletHolder(new IndexServlet()), "/");

        return context;
    }
    
    /**
     * Ensure the jsp engine is initialized correctly
     */
    private List<ContainerInitializer> jspInitializers() {
        JettyJasperInitializer sci = new JettyJasperInitializer();
        ContainerInitializer initializer = new ContainerInitializer(sci, null);
        List<ContainerInitializer> initializers = new ArrayList<>();
        initializers.add(initializer);
        return initializers;
    }

    /**
     * Set Classloader of Context to be sane (needed for JSTL) JSP requires a
     * non-System classloader, this simply wraps the embedded System classloader
     * in a way that makes it suitable for JSP to use
     */
    private ClassLoader getUrlClassLoader() {
        ClassLoader jspClassLoader = new URLClassLoader(new URL[0], this.getClass().getClassLoader());
        return jspClassLoader;
    }

    /**
     * Create JSP Servlet (must be named "jsp")
     */
    private ServletHolder jspServletHolder() {
        ServletHolder holderJsp = new ServletHolder("jsp", JettyJspServlet.class);
        holderJsp.setInitOrder(0);
        holderJsp.setInitParameter("logVerbosityLevel", "DEBUG");
        holderJsp.setInitParameter("fork", "false");
        holderJsp.setInitParameter("xpoweredBy", "false");
        holderJsp.setInitParameter("compilerTargetVM", "1.7");
        holderJsp.setInitParameter("compilerSourceVM", "1.7");
        holderJsp.setInitParameter("keepgenerated", "true");
        return holderJsp;
    }

    /**
     * Create Default Servlet (must be named "default")
     */
    private ServletHolder defaultServletHolder(URI baseUri) {
        ServletHolder holderDefault = new ServletHolder("default", DefaultServlet.class);
        LOG.log(Level.INFO, "Base URI: {0}", baseUri);
        holderDefault.setInitParameter("resourceBase", baseUri.toASCIIString());
        holderDefault.setInitParameter("dirAllowed", "true");
        return holderDefault;
    }

    /**
     * Establish the Server URI
     */
    private URI getServerUri(ServerConnector connector) throws URISyntaxException {
        String scheme = "http";
        for (ConnectionFactory connectFactory : connector.getConnectionFactories()) {
            if (connectFactory.getProtocol().equals("SSL-http")) {
                scheme = "https";
            }
        }
        String host = connector.getHost();
        if (host == null) {
            host = "localhost";
        }
        int port = connector.getLocalPort();
        serverURI = new URI(String.format("%s://%s:%d/", scheme, host, port));
        LOG.log(Level.INFO, "Server URI: {0}", serverURI);
        return serverURI;
    }

    public void stop() throws Exception {
        server.stop();
    }

    /**
     * Cause server to keep running until it receives a Interrupt.
     * <p>
     * Interrupt Signal, or SIGINT (Unix Signal), is typically seen as a result
     * of a kill -TERM {pid} or Ctrl+C
     *
     * @throws InterruptedException if interrupted
     */
    public void waitForInterrupt() throws InterruptedException {
        server.join();
    }
}
