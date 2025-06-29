import React, { useRef, useCallback, useEffect, useState, useContext, useMemo } from 'react';
import './ExploreMenu.css';
import { StoreContext } from '../../context/StoreContext'; // Adjust the import path as needed

const SCROLL_AMOUNT = 150;

const ExploreMenu = ({ category, setCategory }) => {
  const { food_list, baseUrl } = useContext(StoreContext);
  const menuRef = useRef(null);
  const [scrollState, setScrollState] = useState({
    showLeft: false,
    showRight: true,
  });

  // Group food items by category and get first item's image for each category
  const groupedCategories = useMemo(() => {
    const groups = {};
    
    for (let i = 0; i < food_list.length; i++) {
        const item = food_list[i];
        const cat = item.category;
        
        if (!groups[cat]) {
        groups[cat] = {
            name: cat,
            image: `${baseUrl}/images/${item.image}`,
            count: 1
        };
        } else {
        groups[cat].count++;
        }
    }
    
    return Object.values(groups);
  }, [food_list]);
  
  // Check if the scroll container is scrollable left/right and update arrow visibility
  const checkScrollPosition = useCallback(() => {
    if (!menuRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = menuRef.current;
    const showLeft = scrollLeft > 0; // Show left arrow only if there's content scrolled to the left
    const showRight = scrollLeft < scrollWidth - clientWidth - 1; // Show right arrow only if there's more content hidden to the right
    
    setScrollState(prev => (
      prev.showLeft !== showLeft || prev.showRight !== showRight 
        ? { showLeft, showRight } 
        : prev
    ));
  }, []);

  const scroll = useCallback((direction) => {
    if (!menuRef.current) return;
    
    menuRef.current.scrollBy({
      left: direction === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
      behavior: 'smooth'
    });
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    // Image load logic
    const images = menu.querySelectorAll("img");
    let loadedCount = 0;

    const handleImageLoad = () => {
        loadedCount++;
        if (loadedCount === images.length) {
            checkScrollPosition();
        }
    };

    images.forEach(img => {
        // image has already finished loading
        if (img.complete) {
            loadedCount++;
        } else {
            img.addEventListener("load", handleImageLoad);
            img.addEventListener("error", handleImageLoad);
        }
    });
    
    // If all images are already loaded
    if (loadedCount === images.length) {
        checkScrollPosition();
    }

    // for dynamic layout shifts
    const observer = new ResizeObserver(() => {
        checkScrollPosition();
    });

    observer.observe(menu);
    menu.addEventListener("scroll", checkScrollPosition);

    return () => {
        images.forEach(img => {
            img.removeEventListener("load", handleImageLoad);
            img.removeEventListener("error", handleImageLoad);
        });
        menu.removeEventListener("scroll", checkScrollPosition);
        observer.disconnect();
    };
  }, [checkScrollPosition]);


  return (
    <section className="explore-menu" id="explore-menu">
      <header>
        <h1>Explore our menu</h1>
        <p className="explore-menu-text">
          Choose from a diverse menu featuring a delectable array of dishes.
        </p>
      </header>

      <div className="explore-menu-container">
        {scrollState.showLeft && (
          <button 
            aria-label="Scroll left"
            className="scroll-arrow left-arrow" 
            onClick={() => scroll('left')}
          >
            &lt;
          </button>
        )}

        <div className="explore-menu-list" ref={menuRef}>
          {groupedCategories.map((categoryItem) => (
            <div
              key={categoryItem.name}
              onClick={() => setCategory(prev => prev === categoryItem.name ? "All" : categoryItem.name)}
              className="explore-menu-list-item"
            >
              <img
                className={category === categoryItem.name ? "active" : ""}
                src={categoryItem.image}
                alt={categoryItem.name}
                loading="lazy"
                decoding='async'
              />
              <p>{categoryItem.name}</p>
            </div>
          ))}
        </div>

        {scrollState.showRight && (
          <button 
            aria-label="Scroll right"
            className="scroll-arrow right-arrow" 
            onClick={() => scroll('right')}
          >
            &gt;
          </button>
        )}
      </div>
      
      <hr />
    </section>
  );
};

export default ExploreMenu;
