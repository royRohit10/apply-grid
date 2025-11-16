package com.applygrid.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController {

    // forward client-side routes to index.html (adjust patterns as needed)
    @GetMapping(value = { "/", "/jobs/**", "/auth/**", "/applications/**", "/employer/**" })
    public String forwardSpa() {
        return "forward:/index.html";
    }
}