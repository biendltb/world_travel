/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.biendltb.core;

import com.biendltb.world_travel.HelloServlet;
import org.eclipse.jetty.server.Connector;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.ServerConnector;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.eclipse.jetty.util.thread.QueuedThreadPool;

/**
 *
 * @author biendltb
 * @email biendltb@gmail.com
 * @version 1.0
 */
public class MainServer {
    
    public static void main(String[] args) throws Exception {
        
        // Set config file
        Registry.init("server.properties");
        
        // config thread pool
        QueuedThreadPool threadPool = new QueuedThreadPool();
        threadPool.setMinThreads(10);
        threadPool.setMaxThreads(1000);
        
        Server server = new Server(threadPool);
        
        // set up context handler
        ServletContextHandler context_hdl = new ServletContextHandler(ServletContextHandler.SESSIONS);
        context_hdl.setContextPath("/");
        server.setHandler(context_hdl);
        
        // set connector
        ServerConnector server_connector = new ServerConnector(server);
        server_connector.setHost(Registry.get("host"));
        server_connector.setPort(Integer.parseInt(Registry.get("port")));
        server.addConnector(server_connector);
        
        // add resource holder
        ServletHolder assetsHolder = context_hdl.addServlet(org.eclipse.jetty.servlet.DefaultServlet.class, "/assets/*");
        assetsHolder.setInitParameter("resourceBase", "./src/main/resources/assets/");
        assetsHolder.setInitParameter("pathInfoOnly", "true");
        
        context_hdl.addServlet(new ServletHolder(new HelloServlet()), "/*");
        
        server.start();
        server.join();
    }
}
