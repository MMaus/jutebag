package net.hm10;

import io.micronaut.http.HttpRequest;
import io.micronaut.http.MutableHttpRequest;
import io.micronaut.http.client.RxHttpClient;
import io.micronaut.http.client.annotation.Client;
import io.micronaut.test.annotation.MicronautTest;
import org.junit.jupiter.api.Test;

import javax.inject.Inject;

import static org.junit.jupiter.api.Assertions.assertEquals;

@MicronautTest
public class JutebagControllerTest {

    @Inject
    @Client("/")
    RxHttpClient client;

    @Test
    public void test_hello() {
        HttpRequest<String> request = HttpRequest.GET("/jutebag");
        String body = client.toBlocking().retrieve(request);
        assertEquals("Hello, World!", body);
    }



}
