package com.modulo.monitoramento.util;

public class StringUtils {

    public static String addJsonData(String key, Object value){
        return addJsonData(key, value, true);
    }

    public static String addJsonData(String key, Object value, boolean hasNext){
        if (hasNext)
            return String.format("\"%s\" : \"%s\",", key, value);
        return String.format("\"%s\" : \"%s\"", key, value);
    }
}
