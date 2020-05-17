package net.hm10;

import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Produces;
import net.hm10.dto.BagItem;

@Controller("/jutebag")
public class JutebagController {

    @Get
    @Produces(MediaType.TEXT_PLAIN)
    public String index() {
        return "Hello, World!";
    }

    @Get("/bag")
    @Produces(MediaType.APPLICATION_JSON)
    public BagItem bag() {
        return new BagItem("butter", 2);
    }
    
}
