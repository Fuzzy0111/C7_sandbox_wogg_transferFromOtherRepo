package com.wog.controller;

import com.wog.dto.StockItemDto;
import com.wog.service.StockItemService;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.*;
import io.micronaut.http.HttpResponse;

import jakarta.inject.Inject;

import java.util.List;


@Controller("/stock-items")
public class StocksController {

    private final StockItemService StockItemService;

    @Inject
    public StocksController(StockItemService StockItemService) {
        this.StockItemService = StockItemService;
    }

    @Produces(MediaType.APPLICATION_JSON)
    @Get
    public HttpResponse<List<StockItemDto.Response>> getAllStockItems(
            @QueryValue(value = "product_type", defaultValue = "") String product_type,
            @QueryValue(value = "authorName", defaultValue = "") String authorName,
            @QueryValue(value = "year", defaultValue = "") String year,
            @QueryValue(value = "isActive", defaultValue = "") String isActive) {
        
        StockItemDto.FilterRequest filters = new StockItemDto.FilterRequest();
        if (!product_type.isEmpty()) {
            filters.setProductType(StockItemDto.ProductType.valueOf(product_type));
        }
        if (!authorName.isEmpty()) {
            filters.setAuthorName(authorName);
        }
        if (!year.isEmpty()) {
            filters.setYear(Integer.valueOf(year));
        }
        if (!isActive.isEmpty()) {
            filters.setIsActive(Boolean.valueOf(isActive));
        }

        List<StockItemDto.Response> stockItems = StockItemService.findAll(filters);
        return HttpResponse.ok(stockItems);
    }

    @Get("/{id}")
    public HttpResponse<StockItemDto.Response> getStockItemById(@PathVariable Long id) {
        StockItemDto.Response stockItem = StockItemService.findById(id);
        return HttpResponse.ok(stockItem);
    }

    @Post
    public HttpResponse<StockItemDto.Response> createStockItem(@Body StockItemDto.CreateRequest request) {
        StockItemDto.Response stockItem = StockItemService.create(request);
        return HttpResponse.created(stockItem);
    }

    @Put("/{id}")
    public HttpResponse<StockItemDto.Response> updateStockItem(
            @PathVariable Long id,
             @Body StockItemDto.UpdateRequest request) {
        StockItemDto.Response stockItem = StockItemService.update(id, request);
        return HttpResponse.ok(stockItem);
    }

    @Delete("/{id}")
    public HttpResponse<Void> deleteStockItem(@PathVariable Long id) {
        StockItemService.deleteById(id);
        return HttpResponse.noContent();
    }
}



