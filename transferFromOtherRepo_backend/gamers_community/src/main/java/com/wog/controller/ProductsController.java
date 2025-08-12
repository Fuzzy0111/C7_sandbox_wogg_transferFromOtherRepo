package com.wog.controller;

import com.wog.dto.PaginatedResponse;
import com.wog.dto.ProductCardDto;
import com.wog.dto.StockDto;
import com.wog.service.StockService;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.*;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.rules.SecurityRule;
import jakarta.inject.Inject;

import java.util.List;

@Controller("/api/products")
public class ProductsController {

    private final StockService stockService;

    @Inject
    public ProductsController(StockService stockService) {
        this.stockService = stockService;
    }



    @Produces(MediaType.APPLICATION_JSON)
    @Secured(SecurityRule.IS_ANONYMOUS)
    @Get("/cards{?page,limit}")
    public HttpResponse< java.util.Map<String, PaginatedResponse<ProductCardDto>>> getAllProducts(
            @QueryValue(defaultValue = "1") int page,
            @QueryValue(defaultValue = "20") int limit
    ) {
        try {
            List<ProductCardDto> allProdCards = stockService.getProductCards();
            int total = allProdCards.size();

            if (total == 0) {
                return HttpResponse.ok(
                        java.util.Map.of(
                                "data",
                                new PaginatedResponse<>(List.of(), 0, 1, limit, 0)
                        )
                );
            }

            if (limit <= 0) {
                limit = total;
            }

            int totalPages = (int) Math.ceil((double) total / (double) limit);
            int safePage = Math.max(1, Math.min(page, totalPages));
            int from = (safePage - 1) * limit;
            int to = Math.min(from + limit, total);

            List<ProductCardDto> pageData = allProdCards.subList(from, to);

            return HttpResponse.ok(
                    java.util.Map.of(
                            "data",
                            new PaginatedResponse<>(pageData, total, safePage, limit, totalPages)
                    )
            );
        }
        catch (Exception e) {
            return HttpResponse.serverError();
        }
    }



    @Produces(MediaType.APPLICATION_JSON)
    @Secured(SecurityRule.IS_ANONYMOUS)
    @Get("/product-types")
//    public HttpResponse<List<String>> getAllProductTypes() {
//        try {
//            List<String> productTypes = stockService.getAllProductTypes();
//            return HttpResponse.ok(productTypes);
//        } catch (Exception e) {
//            return HttpResponse.serverError();
//        }
//    }
    public HttpResponse<java.util.Map<String, java.util.Map<String, java.util.List<String>>>> getAllProductTypes() {
        java.util.List<String> productTypes = stockService.getAllProductTypes();
        return HttpResponse.ok(java.util.Map.of("data",  java.util.Map.of("data",productTypes)));
    }


    @Produces(MediaType.APPLICATION_JSON)
    @Secured(SecurityRule.IS_ANONYMOUS)
    @Get("/categories")
    public HttpResponse< java.util.Map<String, java.util.Map<String, java.util.List<String>>>> getAllProductCategories() {
        java.util.List<String> productCats = stockService.getAllProductTypes();
        return HttpResponse.ok(java.util.Map.of("data",  java.util.Map.of("data",productCats)));
    }



}
