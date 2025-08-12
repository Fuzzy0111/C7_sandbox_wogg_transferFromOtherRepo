// src/main/java/com/wog/filter/CorsFilter.java
package com.wog.filter;

import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.MutableHttpResponse;
import io.micronaut.http.annotation.Filter;
import io.micronaut.http.filter.HttpServerFilter;
import io.micronaut.http.filter.ServerFilterChain;
import org.reactivestreams.Publisher;
import org.reactivestreams.Subscriber;
import org.reactivestreams.Subscription;

@Filter("/**")
public class CorsFilter implements HttpServerFilter {

    @Override
    public Publisher<MutableHttpResponse<?>> doFilter(HttpRequest<?> request, ServerFilterChain chain) {
        if (request.getMethod().name().equals("OPTIONS")) {
            MutableHttpResponse<?> response = HttpResponse.ok()
                .header("Access-Control-Allow-Origin", getAllowedOrigin(request))
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
                .header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Max-Age", "3600");
            
            return new Publisher<MutableHttpResponse<?>>() {
                @Override
                public void subscribe(Subscriber<? super MutableHttpResponse<?>> subscriber) {
                    subscriber.onSubscribe(new Subscription() {
                        @Override
                        public void request(long n) {
                            subscriber.onNext(response);
                            subscriber.onComplete();
                        }
                        @Override
                        public void cancel() {}
                    });
                }
            };
        }
        
        return new Publisher<MutableHttpResponse<?>>() {
            @Override
            public void subscribe(Subscriber<? super MutableHttpResponse<?>> subscriber) {
                chain.proceed(request).subscribe(new Subscriber<MutableHttpResponse<?>>() {
                    @Override
                    public void onSubscribe(Subscription s) {
                        subscriber.onSubscribe(s);
                    }
                    
                    @Override
                    public void onNext(MutableHttpResponse<?> response) {
                        response.header("Access-Control-Allow-Origin", getAllowedOrigin(request));
                        response.header("Access-Control-Allow-Credentials", "true");
                        subscriber.onNext(response);
                    }
                    
                    @Override
                    public void onError(Throwable t) {
                        subscriber.onError(t);
                    }
                    
                    @Override
                    public void onComplete() {
                        subscriber.onComplete();
                    }
                });
            }
        };
    }

    private String getAllowedOrigin(HttpRequest<?> request) {
        String origin = request.getHeaders().get("Origin");
        if (origin != null && (origin.equals("http://localhost:3000") || 
                              origin.equals("http://localhost:5173") || 
                              origin.equals("http://localhost:80"))) {
            return origin;
        }
        return "http://localhost:3000";
    }

    @Override
    public int getOrder() {
        return -100; // Execute before security filters
    }
}
