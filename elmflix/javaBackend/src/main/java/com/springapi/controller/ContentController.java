package com.example.movies.controller;

import com.example.movies.model.Content;
import com.example.movies.service.ContentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/content")
public class ContentController {
    private final ContentService contentService;

    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @GetMapping
    public List<Content> getAllContent() {
        return contentService.getAllContent();
    }

    @GetMapping("/genre/{genre}")
    public List<Content> getContentByGenre(@PathVariable String genre) {
        return contentService.getContentByGenre(genre);
    }
}
