package com.dev.heasyinstant.configuration;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.view.UrlBasedViewResolver;
import org.springframework.web.servlet.view.tiles3.TilesConfigurer;
import org.springframework.web.servlet.view.tiles3.TilesView;

@Configuration
public class TilesConfig {
	
	@Bean
    public TilesConfigurer tilesConfigurer() {
       TilesConfigurer configurer = new TilesConfigurer();
        configurer.setDefinitions("WEB-INF/tile/tiles.xml");
        //configurer.setCheckRefresh(true);
        return configurer;
    }

    /**
     * Introduce a Tiles view resolver, this is a convenience implementation that extends URLBasedViewResolver.
     * 
     * @return tiles view resolver
     */
    @Bean
    public  UrlBasedViewResolver tilesViewResolver()
     {
    	UrlBasedViewResolver tilesViewResolver = new UrlBasedViewResolver();
       // final TilesViewResolver resolver = new TilesViewResolver();
       // resolver.setViewClass(TilesView.class);
    	tilesViewResolver.setViewClass(TilesView.class);
       // return resolver;
        return  tilesViewResolver;
    }
	
  
	
	}
