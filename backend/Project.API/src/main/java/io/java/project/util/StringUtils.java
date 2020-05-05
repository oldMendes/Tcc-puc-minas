package io.java.project.util;

import java.util.HashMap;
import java.util.Map;

public class StringUtils {

    public static Map<String, String> parseMessageData(String message){
        try {
            String [] parameters = message
                    .replaceAll("\\{", "")
                    .replaceAll("}","")
                    .split(",");
            Map<String, String> tokens = new HashMap<>();
            for (String line : parameters){
                String[] keyValue = line.replaceAll("\"", "").split(":");
                tokens.put(keyValue[0].trim(), keyValue[1].trim());
            }
            if (!tokens.isEmpty())
                return tokens;
        } catch (Exception ex){
            return new HashMap<>();
        }
        return new HashMap<>();
    }

    public static boolean isDataMissing(String... strings){
        for (String current : strings){
            if (current == null || "".equals(current.trim()))
                return true;
        }
        return false;
    }
}
