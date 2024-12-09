package com.example.movies.service;

import com.example.movies.model.Content;
import com.example.movies.repository.ContentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContentService {
    private final ContentRepository contentRepository;

    public ContentService(ContentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }

    public List<Content> getAllContent() {
        return contentRepository.findAll();
    }

    public List<Content> getContentByGenre(String genre) {
        return contentRepository.findByGenre(genre);
    }
}
