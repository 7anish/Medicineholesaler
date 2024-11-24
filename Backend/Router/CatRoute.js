const express = require('express');
const route = express.Router()

const cat = [
    {
        "category": "cosmetic-products",
        "img": "sparkles",
        "bg": "#ffe4e1",
        "text": "#ff6347",
        "subcat": [
            {
                "name": "baby, female-&-elderly-care",
                "route": "cosmetic-products/baby-and-female-and-elderly-care",
                "bg": "#ffe8e8",
                "icon": "accessibility-outline",
                "iconColor": "#ff6347"
            },
            {
                "name": "face-&-oral-care",
                "route": "cosmetic-products/face-and-oral-care",
                "bg": "#ffe8e8",
                "icon": "happy-outline",
                "iconColor": "#ff6347"
            },
            {
                "name": "sexual-wellness",
                "route": "cosmetic-products/sexual-wellness",
                "bg": "#ffe8e8",
                "icon": "heart-outline",
                "iconColor": "#ff6347"
            },
            {
                "name": "shampoo-&-body-care",
                "route": "cosmetic-products/shampoo-and-body-care",
                "bg": "#ffe8e8",
                "icon": "cut-outline",
                "iconColor": "#ff6347"
            },
            {
                "name": "health-&-wellness",
                "route": "cosmetic-products/health-and-wellness",
                "bg": "#ffe8e8",
                "icon": "pulse-outline",
                "iconColor": "#ff6347"
            },
            {
                "name": "others",
                "route": "cosmetic-products/others",
                "bg": "#ffe8e8",
                "icon": "ellipsis-horizontal-outline",
                "iconColor": "#ff6347"
            },
            {
                "name": "All Products",
                "route": "cosmetic-products/all",
                "bg": "#ffe8e8",
                "icon": "apps-outline",
                "iconColor": "#ff6347"
            }
        ]
    },
    {
        "category": "surgical-items",
        "img": "cut-outline",
        "bg": "#edfefff8",
        "text": "#2dd1dd",
        "subcat": [
            {
                "name": "bandage",
                "route": "surgical-items/bandage",
                "bg": "#ffe8e8",
                "icon": "bandage-outline",
                "iconColor": "#2dd1dd"
            },
            {
                "name": "sugar-&-bP-care-machine",
                "route": "surgical-items/sugar-and-BP-care-machine",
                "bg": "#ffe8e8",
                "icon": "pulse-outline",
                "iconColor": "#2dd1dd"
            },
            {
                "name": "syringe",
                "route": "surgical-items/syringe",
                "bg": "#ffe8e8",
                "icon": "medkit-outline",
                "iconColor": "#2dd1dd"
            },
            {
                "name": "others",
                "route": "surgical-items/others",
                "bg": "#ffe8e8",
                "icon": "ellipsis-horizontal-outline",
                "iconColor": "#2dd1dd"
            },
            {
                "name": "All Products",
                "route": "surgical-items/all",
                "bg": "#ffe8e8",
                "icon": "apps-outline",
                "iconColor": "#2dd1dd"
            }
        ]
    },    
    {
        "category": "patent-medicine",
        "img": "medkit-outline",
        "bg": "#ffe8e8",
        "text": "#ff4500",
        "subcat": [
            {
                "name": "injections",
                "route": "patent-medicine/injections",
                "bg": "#ffe8e8",
                "icon": "flash-outline",
                "iconColor": "#ff4500"
            },
            {
                "name": "tablet-&-capsule",
                "route": "patent-medicine/tablet-and-capsule",
                "bg": "#ffe8e8",
                "icon": "cube-outline",
                "iconColor": "#ff4500"
            },
            {
                "name": "syrup",
                "route": "patent-medicine/syrup",
                "bg": "#ffe8e8",
                "icon": "water-outline",
                "iconColor": "#ff4500"
            },
            {
                "name": "cream-&-ointment",
                "route": "patent-medicine/cream-and-ointment",
                "bg": "#ffe8e8",
                "icon": "color-palette-outline",
                "iconColor": "#ff4500"
            },
            {
                "name": "paediatric-drop-&-syrup",
                "route": "patent-medicine/peadiatric-drop-and-syrup",
                "bg": "#ffe8e8",
                "icon": "water-outline",
                "iconColor": "#ff6347"
            },
            {
                "name": "others",
                "route": "patent-medicine/others",
                "bg": "#ffe8e8",
                "icon": "ellipsis-horizontal-outline",
                "iconColor": "#ff6347"
            },
            {
                "name": "All Products",
                "route": "patent-medicine/all",
                "bg": "#ffe8e8",
                "icon": "apps-outline",
                "iconColor": "#ff6347"
            }
        ]
    },    
    {
        "category": "generic-medicine",
        "img": "bandage-outline",
        "bg": "#f0fff0",
        "text": "#32cd32",
        "subcat": [
            {
                "name": "injections",
                "route": "generic-medicine/injections",
                "bg": "#ffe8e8",
                "icon": "flash-outline",
                "iconColor": "#32cd32"
            },
            {
                "name": "tablet-&-capsule",
                "route": "generic-medicine/tablet-and-capsule",
                "bg": "#ffe8e8",
                "icon": "cube-outline",
                "iconColor": "#32cd32"
            },
            {
                "name": "syrup",
                "route": "generic-medicine/syrup",
                "bg": "#ffe8e8",
                "icon": "water-outline",
                "iconColor": "#32cd32"
            },
            {
                "name": "cream-&-ointment",
                "route": "generic-medicine/cream-and-ointment",
                "bg": "#ffe8e8",
                "icon": "color-palette-outline",
                "iconColor": "#32cd32"
            },
            {
                "name": "paediatric-drop-&-syrup",
                "route": "generic-medicine/pediatric-drop-and-syrup",
                "bg": "#ffe8e8",
                "icon": "water-outline",
                "iconColor": "#ff6347"
            },
            {
                "name": "others",
                "route": "generic-medicine/others",
                "bg": "#ffe8e8",
                "icon": "ellipsis-horizontal-outline",
                "iconColor": "#ff6347"
            },
            
            {
                "name": "All Products",
                "route": "generic-medicine/all",
                "bg": "#ffe8e8",
                "icon": "apps-outline",
                "iconColor": "#ff6347"
            },
        ]
    },    
    {
        "category": "ayurvedic-products",
        "img": "leaf-outline",
        "bg": "#f5fffa",
        "text": "#228b22",
        "subcat": [
            {
                "name": "bati,-tablets-&-capsule",
                "route": "ayurvedic-product/bati-tablets-and-capsule",
                "bg": "#ffe8e8",
                "icon": "tablet-landscape-outline",
                "iconColor": "#228b22"
            },
            {
                "name": "asave-&-syrup",
                "route": "ayurvedic-product/asave-and-syrup",
                "bg": "#ffe8e8",
                "icon": "water-outline",
                "iconColor": "#228b22"
            },
            {
                "name": "churan-&-powder",
                "route": "ayurvedic-product/churan-and-powder",
                "bg": "#ffe8e8",
                "icon": "leaf-outline",
                "iconColor": "#228b22"
            },
            {
                "name": "others",
                "route": "ayurvedic-product/others",
                "bg": "#ffe8e8",
                "icon": "ellipsis-horizontal-outline",
                "iconColor": "#228b22"
            },
            {
                "name": "All Products",
                "route": "ayurvedic-product/all",
                "bg": "#ffe8e8",
                "icon": "apps-outline",
                "iconColor": "#228b22"
            },
        ]
    }
    
]

route.get('/getcategory', (req, res) => {
    try {
        if(req.query.category === "allcategory") return res.status(200).json(cat)
        const param =  cat.find((item)=>{
            return item.category === req.query.category
        });
        return res.status(200).json([param])
    } catch (e) {
        console.log(e)
        return res.status(400).json({ "Error": "Bad request" })
    }
})

module.exports = route