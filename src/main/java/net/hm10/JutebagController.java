package net.hm10;

import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Produces;

@Controller("/jutebag")
public class JutebagController {

    @Get
    @Produces(MediaType.TEXT_PLAIN)
    public String index() {
        return "Hello, World!";
    }
    
    
}
