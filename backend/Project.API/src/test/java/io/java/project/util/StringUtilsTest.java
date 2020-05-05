package io.java.project.util;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class StringUtilsTest {

    @Test
    public void testParsing(){
        System.out.println(
                StringUtils.parseMessageData("{\"id\": \"4\",\"notification\" : \"Problem\"}")
        );
    }


    @Test
    public void testEMpty(){
        System.out.println(
                StringUtils.parseMessageData("")
        );
    }

}