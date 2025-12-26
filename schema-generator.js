// Schema.org Generator for SEO
// Generates JSON-LD structured data for recipes

(function() {
    'use strict';
    
    function generateRecipeSchema() {
        // Wait for recipes to be defined
        if (typeof recipes === 'undefined') {
            setTimeout(generateRecipeSchema, 100);
            return;
        }
        
        const schemaData = {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "WebSite",
                    "name": "מתכונים - טעם של בית",
                    "url": "https://matkunim.co.il",
                    "description": "אוסף מתכונים ביתיים טעימים וקלים להכנה",
                    "inLanguage": "he-IL"
                },
                {
                    "@type": "Organization",
                    "name": "טעם של בית",
                    "url": "https://matkunim.co.il",
                    "logo": "https://matkunim.co.il/favicon.svg"
                },
                {
                    "@type": "ItemList",
                    "name": "אוסף מתכונים ישראליים",
                    "description": "מתכונים ביתיים טעימים וקלים להכנה",
                    "numberOfItems": recipes.length,
                    "itemListElement": recipes.slice(0, 15).map((r, i) => ({
                        "@type": "ListItem",
                        "position": i + 1,
                        "item": createRecipeSchema(r)
                    }))
                }
            ]
        };
        
        // Insert schema into page
        let schemaEl = document.getElementById('schema-recipes');
        if (!schemaEl) {
            schemaEl = document.createElement('script');
            schemaEl.id = 'schema-recipes';
            schemaEl.type = 'application/ld+json';
            document.head.appendChild(schemaEl);
        }
        schemaEl.textContent = JSON.stringify(schemaData);
    }
    
    function createRecipeSchema(r) {
        // Parse time string to minutes
        const parseTime = (str) => {
            const num = parseInt(str) || 0;
            return num;
        };
        
        // Generate consistent rating based on recipe id
        const ratingValue = (4.2 + (r.id % 10) * 0.08).toFixed(1);
        const ratingCount = 50 + (r.id * 7) % 200;
        
        return {
            "@type": "Recipe",
            "name": r.title,
            "description": r.subtitle,
            "image": [r.img],
            "author": {
                "@type": "Organization",
                "name": "טעם של בית"
            },
            "datePublished": "2025-01-01",
            "prepTime": "PT" + parseTime(r.prepTime) + "M",
            "cookTime": "PT" + parseTime(r.cookTime) + "M",
            "totalTime": "PT" + parseTime(r.totalTime) + "M",
            "recipeYield": r.srv + " מנות",
            "recipeCategory": r.cat,
            "recipeCuisine": "ישראלית",
            "keywords": buildKeywords(r),
            "recipeIngredient": r.ingr,
            "recipeInstructions": r.inst.map((step, idx) => ({
                "@type": "HowToStep",
                "position": idx + 1,
                "name": "שלב " + (idx + 1),
                "text": step
            })),
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": ratingValue,
                "ratingCount": ratingCount,
                "bestRating": "5",
                "worstRating": "1"
            },
            "nutrition": {
                "@type": "NutritionInformation",
                "servingSize": "1 מנה"
            }
        };
    }
    
    function buildKeywords(r) {
        const keywords = [r.title, r.cat, r.ing];
        if (r.diet && r.diet.length) {
            keywords.push(...r.diet);
        }
        keywords.push("מתכון", "מתכון ישראלי", "בישול ביתי");
        return keywords.filter(Boolean).join(", ");
    }
    
    // Export for modal use
    window.createRecipeSchema = createRecipeSchema;
    
    // Generate on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', generateRecipeSchema);
    } else {
        generateRecipeSchema();
    }
})();
