/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.biendltb.core;

import com.biendltb.world_travel.HelloServlet;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;

/**
 *
 * @author biendltb
 */
public class MainServer {
    private static final int DEFAULT_PORT = 8080;
    
    public static void main(String[] args) throws Exception {
        Server server = new Server(DEFAULT_PORT);
        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        server.setHandler(context);
        
        context.addServlet(new ServletHolder(new HelloServlet()), "/*");
        
        server.start();
        server.join();
    }
}
