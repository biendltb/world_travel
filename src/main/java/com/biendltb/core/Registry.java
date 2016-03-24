/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.biendltb.core;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 *
 * @author biendltb
 * @email biendltb@gmail.com
 * @version 1.0
 */
public class Registry {
    private static Properties properties;
    public static synchronized String get(String key){
        return properties.getProperty(key);
    }
    public static void init(String propertyFileName){
        try {
            ClassLoader loader = Thread.currentThread().getContextClassLoader();
            properties = new Properties();
            InputStream resourceStream = loader.getResourceAsStream(propertyFileName);
            properties.load(resourceStream);
        } catch (IOException e){
            e.printStackTrace();
        }
    }
}
