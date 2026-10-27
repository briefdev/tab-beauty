/* ==================== block 1 ==================== */
// إدراج زر الهامبرغر ديناميكياً بجانب لوجو الهيدر لشاشات الموبايل دون إفساد الـ HTML المرفوع
        document.addEventListener('DOMContentLoaded', () => {
            const headerContent = document.querySelector('.header-content');
            const navLinks = document.querySelector('.nav-links');

            // إنشاء زر الهامبرغر
            const hamburgerHTML = `
                <button class="hamburger-toggle" id="hamburgerMenuBtn" aria-label="قائمة التنقل">
                    <i class="fa-solid fa-bars"></i>
                </button>
            `;
            // نضعه قبل اللوجو مباشرة على الموبايل
            if (!document.getElementById('hamburgerMenuBtn')) headerContent.insertAdjacentHTML('afterbegin', hamburgerHTML);
            
            // إضافة التنسيقات المتجاوبة لزر الهامبرغر في الميديا كويري برمجياً
            const style = document.createElement('style');
            style.innerHTML = `
                @media (max-width: 992px) {
                    .hamburger-toggle {
                        display: block !important;
                    }
                    .header-actions .btn {
                        display: none !important;
                    }
                }
            `;
            document.head.appendChild(style);
        });


/* ==================== block 2 ==================== */
document.addEventListener('DOMContentLoaded', function() {
            // صفحات محتوى الجوال: فتح وإغلاق بدون زيادة طول الصفحة الرئيسية
            const mobileContentPages = document.querySelectorAll('.mobile-content-page');
            let lastContentPageTrigger = null;
            const openMobilePage = (page) => {
                if (!page) return;
                mobileContentPages.forEach(item => {
                    item.classList.remove('active');
                    item.setAttribute('aria-hidden', 'true');
                });
                page.classList.add('active');
                page.setAttribute('aria-hidden', 'false');
                page.scrollTop = 0;
                document.body.style.overflow = 'hidden';
                setTimeout(() => page.querySelector('.mobile-page-close')?.focus(), 40);
            };
            const closeMobilePages = () => {
                mobileContentPages.forEach(item => {
                    item.classList.remove('active');
                    item.setAttribute('aria-hidden', 'true');
                });
                document.body.style.overflow = '';
                lastContentPageTrigger?.focus();
            };
            document.querySelectorAll('[data-open-mobile-page]').forEach(button => {
                button.addEventListener('click', event => {
                    event.preventDefault();
                    lastContentPageTrigger = button;
                    openMobilePage(document.getElementById(button.dataset.openMobilePage));
                });
            });
            document.querySelectorAll('[data-close-mobile-page]').forEach(button => {
                button.addEventListener('click', closeMobilePages);
            });
            document.addEventListener('keydown', event => {
                if (event.key === 'Escape') closeMobilePages();
            });
            // مبدّل أنواع الرموش ولون النقش المرتبط بكل نوع.
            const mobileBoxImage = document.getElementById('mobileBoxImage');
            const mobileLashImage = document.getElementById('mobileLashImage');
            const mobileBoxName = document.getElementById('mobileBoxName');
            const mobileBoxColor = document.getElementById('mobileBoxColor');
            const mobileBoxDesc = document.getElementById('mobileBoxDesc');
            const mobileBoxSwatches = document.querySelectorAll('.mobile-box-swatch');
            mobileBoxSwatches.forEach(swatch => {
                swatch.addEventListener('click', () => {
                    mobileBoxSwatches.forEach(item => item.classList.remove('active'));
                    swatch.classList.add('active');
                    [mobileBoxImage, mobileLashImage].forEach(image => {
                        if (!image) return;
                        image.style.opacity = '0';
                        image.style.transform = 'translateY(6px) scale(.97)';
                    });
                    setTimeout(() => {
                        if (mobileBoxImage) {
                            mobileBoxImage.src = swatch.dataset.boxImage;
                            mobileBoxImage.alt = `علبة ${swatch.dataset.boxName} - ${swatch.dataset.colorName}`;
                            mobileBoxImage.style.opacity = '1';
                            mobileBoxImage.style.transform = 'translateY(0) scale(1)';
                        }
                        if (mobileLashImage) {
                            mobileLashImage.src = swatch.dataset.lashImage;
                            mobileLashImage.alt = `رموش ${swatch.dataset.boxName}`;
                            mobileLashImage.style.opacity = '1';
                            mobileLashImage.style.transform = 'translateY(0) scale(1)';
                        }
                    }, 140);
                    if (mobileBoxName) mobileBoxName.textContent = swatch.dataset.boxName;
                    if (mobileBoxColor) mobileBoxColor.textContent = swatch.dataset.colorName;
                    if (mobileBoxDesc) mobileBoxDesc.textContent = swatch.dataset.desc;
                });
            });

            // سكريبت إخفاء شاشة الترحيب والتحميل الفاخرة بعد التحميل الكامل للـ DOM والموارد
            window.addEventListener('load', function() {
                const preloader = document.getElementById('tab-preloader');
                if (preloader) {
                    preloader.style.opacity = '0';
                    preloader.style.visibility = 'hidden';
                    setTimeout(() => {
                        preloader.remove();
                    }, 800);
                }
            });

            // سكريبت السلايدر الخاص بالرموش
            const track = document.getElementById('productTrack');
            const prevBtn = document.getElementById('sliderPrev');
            const nextBtn = document.getElementById('sliderNext');
            const cards = document.querySelectorAll('.product-card');
            const sliderContainer = document.getElementById('sliderContainer');
            
            let currentIndex = 0;

            function getCardsToShow() {
                if (window.innerWidth <= 768) return 1;
                if (window.innerWidth <= 992) return 2;
                return 3;
            }

            function updateSlider() {
                const cardsToShow = getCardsToShow();
                const maxIndex = Math.max(0, cards.length - cardsToShow);
                
                if (currentIndex > maxIndex) currentIndex = maxIndex;
                if (currentIndex < 0) currentIndex = 0;

                const cardWidth = cards[0].offsetWidth;
                const gap = 30; 
                const moveAmount = currentIndex * (cardWidth + gap);
                
                track.style.transform = `translateX(${moveAmount}px)`;
                
                prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
                prevBtn.style.cursor = currentIndex === 0 ? 'default' : 'pointer';
                nextBtn.style.opacity = currentIndex === maxIndex ? '0.3' : '1';
                nextBtn.style.cursor = currentIndex === maxIndex ? 'default' : 'pointer';
            }

            nextBtn.addEventListener('click', () => {
                const maxIndex = Math.max(0, cards.length - getCardsToShow());
                if (currentIndex < maxIndex) {
                    currentIndex++;
                    updateSlider();
                }
            });

            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateSlider();
                }
            });

            window.addEventListener('resize', updateSlider);
            updateSlider();

            // ========================================================
            // NEW: Swipe Touch Gestures Support for Product Slider
            // ========================================================
            let touchStartX = 0;
            let touchEndX = 0;

            sliderContainer.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            sliderContainer.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipeGesture();
            }, { passive: true });

            function handleSwipeGesture() {
                const swipeThreshold = 50; // الحد الأدنى للمسافة لاعتماد السحبة
                const swipeDiff = touchEndX - touchStartX;

                // في اتجاه الـ RTL (من اليمين لليسار):
                // السحب لليمين يعني الرغبة في رؤية المنتجات السابقة (السابق)
                // السحب لليسار يعني الرغبة في رؤية المنتجات التالية (التالي)
                if (swipeDiff > swipeThreshold) {
                    // سحب لليمين -> السابق
                    prevBtn.click();
                } else if (swipeDiff < -swipeThreshold) {
                    // سحب ليسار -> التالي
                    nextBtn.click();
                }
            }

            // ========================================================
            // NEW: Scroll Reveal Animation (Intersection Observer)
            // ========================================================
            const sectionsToReveal = document.querySelectorAll('section, .reveal-element');
            
            function staggerSectionChildren(parentSection) {
                const staggerItems = parentSection.querySelectorAll('.stagger-reveal');
                staggerItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('revealed');
                    }, index * 120); // فجوة زمنية متطورة من أبل
                });
            }

            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        staggerSectionChildren(entry.target);
                        observer.unobserve(entry.target); // إيقاف المراقبة بمجرد الظهور الأول
                    }
                });
            }, {
                threshold: 0.1, // يبدأ التفاعل فور ظهور 10% من العنصر
                rootMargin: '0px 0px -40px 0px'
            });

            sectionsToReveal.forEach(el => {
                revealObserver.observe(el);
            });

            // ========================================================
            // NEW: Interactive Case Studio Switcher (Compact & Fallback Secure)
            // ========================================================
            const studioSwatches = document.querySelectorAll('.studio-swatch');
            const activeImage = document.getElementById('activeCaseImage');
            const studioGlow = document.getElementById('studioGlow');
            const selectedColorName = document.getElementById('selectedColorName');
            const activeColorDesc = document.getElementById('activeColorDesc');
            const engravedLogo = document.getElementById('engravedLogo');
            const activeLashPreview = document.getElementById('activeLashPreview');
            const activeTypeLabel = document.getElementById('activeTypeLabel');
            const activeTypeColor = document.getElementById('activeTypeColor');
            const linkedLashName = document.getElementById('linkedLashName');
            const linkedCaseName = document.getElementById('linkedCaseName');
            const linkedTypeStage = document.getElementById('linkedTypeStage');

            // سكريبت معالجة وحل مشكلة الامتداد تلقائياً محلياً
            function setWithFallback(imgElement, src) {
                imgElement.src = src;
                imgElement.onerror = function() {
                    this.onerror = null; 
                    if (src.endsWith('.png')) {
                        this.src = src.replace('.png', '.jpg');
                    } else if (src.endsWith('.jpg')) {
                        this.src = src.replace('.jpg', '.png');
                    }
                };
            }

            studioSwatches.forEach(swatch => {
                swatch.addEventListener('click', function() {
                    studioSwatches.forEach(s => {
                        s.classList.remove('active');
                        s.style.removeProperty('--active-theme-color');
                    });
                    this.classList.add('active');

                    const newImageSrc = this.getAttribute('data-image');
                    const glowColor = this.getAttribute('data-glow');
                    const themeColor = this.getAttribute('data-theme');
                    const colorName = this.getAttribute('data-name');
                    const colorDesc = this.getAttribute('data-desc');
                    const lashImageSrc = this.getAttribute('data-lash-image');
                    const typeLabel = this.getAttribute('data-type');
                    const typeColor = this.getAttribute('data-color-name');
                    const caseLabel = this.getAttribute('data-case-label') || typeColor;

                    // تعيين الألوان والوصف بشكل تفاعلي
                    selectedColorName.innerText = colorName;
                    selectedColorName.style.color = themeColor;
                    selectedColorName.style.background = `${themeColor}12`; // خلفية باستيل متناغمة
                    activeColorDesc.innerText = colorDesc;
                    if (activeTypeLabel) activeTypeLabel.innerText = typeLabel;
                    if (activeTypeColor) activeTypeColor.innerText = typeColor;
                    if (linkedLashName) linkedLashName.innerText = typeLabel;
                    if (linkedCaseName) linkedCaseName.innerText = caseLabel;
                    if (linkedTypeStage) linkedTypeStage.style.setProperty('--linked-theme', themeColor);
                    if (activeLashPreview && lashImageSrc) {
                        activeLashPreview.style.opacity = '0';
                        activeLashPreview.style.transform = 'translateY(8px) scale(.96)';
                        setTimeout(() => {
                            setWithFallback(activeLashPreview, lashImageSrc);
                            activeLashPreview.alt = `رموش ${typeLabel}`;
                            activeLashPreview.style.opacity = '1';
                            activeLashPreview.style.transform = 'translateY(0) scale(1)';
                        }, 120);
                    }
                    if (engravedLogo) {
                        engravedLogo.style.setProperty('--logo-color', themeColor);
                        engravedLogo.style.transform = 'scale(1.08)';
                        setTimeout(() => { engravedLogo.style.transform = 'scale(1)'; }, 220);
                    }

                    this.style.setProperty('--active-theme-color', themeColor);

                    activeImage.style.opacity = '0';
                    activeImage.style.transform = 'scale(0.95) rotateY(10deg)';
                    
                    setTimeout(() => {
                        setWithFallback(activeImage, newImageSrc);
                        activeImage.alt = colorName;
                        studioGlow.style.background = glowColor;
                        
                        activeImage.style.opacity = '1';
                        activeImage.style.transform = 'scale(1) rotateY(0deg)';
                    }, 250);
                });
            });

            // ========================================================
            // NEW: Clean Community FAQ Accordion & Smart Live Search
            // ========================================================
            const faqItemsClean = document.querySelectorAll('.faq-item-clean');
            
            faqItemsClean.forEach(item => {
                const trigger = item.querySelector('.faq-trigger-clean');
                const content = item.querySelector('.faq-content-clean');

                trigger.addEventListener('click', () => {
                    const isOpen = item.classList.contains('open');

                    // إغلاق أي سؤال مفتوح آخر قبل فتح الحالي
                    faqItemsClean.forEach(c => {
                        c.classList.remove('open');
                        c.querySelector('.faq-content-clean').style.maxHeight = null;
                    });

                    if (!isOpen) {
                        item.classList.add('open');
                        content.style.maxHeight = content.scrollHeight + "px";
                    }
                });
            });

            const searchInputClean = document.getElementById('faqSearchInput');
            
            if(searchInputClean) {
                searchInputClean.addEventListener('input', function() {
                    const query = this.value.trim().toLowerCase();
                    
                    faqItemsClean.forEach(item => {
                        const questionText = item.querySelector('.faq-trigger-clean span').innerText.toLowerCase();
                        const answerText = item.querySelector('.faq-inner-clean').innerText.toLowerCase();
                        
                        if (questionText.includes(query) || answerText.includes(query)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                            item.classList.remove('open');
                            item.querySelector('.faq-content-clean').style.maxHeight = null;
                        }
                    });
                });
            }

            // ========================================================
            // NEW: Interactive Model Eye Look Preview Switcher
            // ========================================================
            const lookTabs = document.querySelectorAll('.look-tab-btn');
            const lookTitle = document.getElementById('lookTitle');
            const lookDesc = document.getElementById('lookDesc');
            const lookFeatures = document.getElementById('lookFeatures');
            const lashLookImage = document.getElementById('lashLookImage');

            const looksData = {
                iris: {
                    title: 'Pink — خصل مرسومة بخفة',
                    desc: 'تصميم Wispy بخصل متفرقة وأطوال متفاوتة بعناية؛ يضيف وضوحاً ناعماً للعين من دون أن يفقدها طبيعتها.',
                    image: 'assets/images/lash-eye-iris-black.png',
                    features: [
                        'خصل منفصلة تمنح العين بُعداً أجمل',
                        'كثافة متوسطة مناسبة لليوم والمساء',
                        'تدرج غير منتظم بمظهر عصري'
                    ]
                },
                frost: {
                    title: 'Blue — خفة هوائية مرتبة',
                    desc: 'توزيع أخف ومسافات أوسع بين الخصل للحصول على إطلالة هادئة ونظيفة تفتح العين وتناسب الروتين اليومي.',
                    image: 'assets/images/lash-eye-frost-black.png',
                    features: [
                        'إحساس خفيف ومريح على العين',
                        'مظهر مرتب من دون كثافة زائدة',
                        'ملائم للدوام والإطلالات الناعمة'
                    ]
                },
                bunny: {
                    title: 'Green — خصل جريئة مرحة',
                    desc: 'خصل Spiky أكثر وضوحاً ترفع العين وتمنحها شخصية لافتة؛ اختيار مناسب عندما تريدين حضوراً أقوى في الصورة.',
                    image: 'assets/images/lash-eye-bunny-black.png',
                    features: [
                        'قمم مدببة واضحة وموزعة بإيقاع',
                        'تأثير يرفع العين ويبرز أطرافها',
                        'مناسب للمناسبات والتصوير'
                    ]
                },
                ice: {
                    title: 'Purple — كثافة سوداء أنيقة',
                    desc: 'خصل متقاربة وممتلئة ترسم خطاً أسود واضحاً حول العين، مع تدرج يحافظ على شكل أنيق ومتوازن.',
                    image: 'assets/images/lash-eye-ice-black.png',
                    features: [
                        'كثافة عالية وحضور واضح',
                        'امتلاء متقارب على كامل خط الرمش',
                        'اختيار مثالي للوك المسائي'
                    ]
                },
                natural: {
                    title: 'Orange — الطبيعي المتوازن',
                    desc: 'أقرب نتيجة للرموش الطبيعية؛ خصل متوازنة وخفيفة تمنح العين حضوراً مرتباً من دون مبالغة، ومناسبة للدوام والاستخدام اليومي.',
                    image: 'assets/images/lash-eye-natural.png',
                    features: [
                        'خفة مناسبة لساعات اليوم الطويلة',
                        'تدرج متوازن يندمج مع خط الرموش',
                        'اختيار واضح للمبتدئات والإطلالة الهادئة'
                    ]
                },
                morning: {
                    title: 'Yellow — امتلاء ضبابي ناعم',
                    desc: 'خصل دقيقة أكثر امتلاءً من اللوك الطبيعي، بتوزيع ناعم يفتح العين ويمنحها عمقاً جذاباً من دون حدة.',
                    image: 'assets/images/lash-eye-morning-mist.png',
                    features: [
                        'امتلاء ناعم بخصل دقيقة',
                        'انتقال متوازن من الداخل إلى الخارج',
                        'لوك رومانسي مناسب للصباح والمساء'
                    ]
                }
            };

            lookTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    lookTabs.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');

                    const lookKey = this.getAttribute('data-look');
                    const data = looksData[lookKey];

                    lookTitle.style.opacity = '0';
                    lookDesc.style.opacity = '0';
                    lookFeatures.style.opacity = '0';
                    if (lashLookImage) {
                        lashLookImage.style.opacity = '0';
                        lashLookImage.style.transform = 'scale(1.015)';
                    }

                    setTimeout(() => {
                        lookTitle.innerText = data.title;
                        lookDesc.innerText = data.desc;
                        if (lashLookImage) {
                            lashLookImage.src = data.image;
                            lashLookImage.alt = `${data.title} على عين طبيعية`;
                            lashLookImage.style.opacity = '1';
                            lashLookImage.style.transform = 'scale(1)';
                        }
                        
                        lookFeatures.innerHTML = data.features.map(f => `
                            <div class="look-feature-item">
                                <i class="fa-solid fa-check"></i>
                                <span>${f}</span>
                            </div>
                        `).join('');

                        lookTitle.style.opacity = '1';
                        lookDesc.style.opacity = '1';
                        lookFeatures.style.opacity = '1';
                    }, 300);
                });
            });

            // ========================================================
            // NEW: Elegant Product Detail View Navigation & Image Switcher
            // ========================================================
            const productCards = document.querySelectorAll('.product-card');
            const detailOverlay = document.getElementById('productDetailOverlay');
            const closeDetailBtn = document.getElementById('closeDetailBtn');
            
            const detailMainImg = document.getElementById('detailMainImg');
            const thumbProduct = document.getElementById('thumbProduct');
            const thumbModel = document.getElementById('thumbModel');
            const thumbOpenCase = document.getElementById('thumbOpenCase');
            const thumbClosedCase = document.getElementById('thumbClosedCase');
            const thumbPackaging = document.getElementById('thumbPackaging');
            const thumbProductImage = document.getElementById('thumbProductImage');
            const thumbModelImage = document.getElementById('thumbModelImage');
            const thumbOpenCaseImage = document.getElementById('thumbOpenCaseImage');
            const thumbClosedCaseImage = document.getElementById('thumbClosedCaseImage');
            const thumbPackagingImage = document.getElementById('thumbPackagingImage');
            const detailThumbs = document.querySelectorAll('.detail-thumb');
            
            const detailBadge = document.getElementById('detailBadge');
            const detailTitle = document.getElementById('detailTitle');
            const detailPrice = document.getElementById('detailPrice');
            const detailPriceOld = document.getElementById('detailPriceOld');
            const detailDesc = document.getElementById('detailDesc');
            
            const qtyMinus = document.getElementById('qtyMinus');
            const qtyPlus = document.getElementById('qtyPlus');
            const qtyValue = document.getElementById('qtyValue');
            const addToCartDetail = document.getElementById('addToCartDetail');
            const cartSuccessToast = document.getElementById('cartSuccessToast');
            const toastProductName = document.getElementById('toastProductName');
            
            // بيانات المنتجات الكاملة لتغذية الواجهة ديناميكياً
            const productsDetailData = {
                'Pink': {
                    title: 'Pink',
                    price: '١٠٠ ريال',
                    priceOld: '١٣٠ ريال',
                    badge: 'Wispy',
                    theme: '#FF98CB',
                    img: 'assets/images/tab-lash-01-iris-black.png',
                    modelImg: 'assets/images/lash-eye-iris-black.png',
                    openCaseImg: 'assets/images/product_lashes_case_open_transparent.png',
                    closedCaseImg: 'assets/images/case-linked-01-iris-black.png',
                    packagingImg: 'assets/images/packaging_color_coding_grid.png',
                    desc: 'خصل متفرقة بأطوال مدروسة تمنح العين وضوحاً ناعماً ونتيجة Wispy عصرية تناسب اليوم والمساء.'
                },
                'Blue': {
                    title: 'Blue',
                    price: '١٠٠ ريال',
                    priceOld: '١٣٠ ريال',
                    badge: 'Airy',
                    theme: '#58A9E8',
                    img: 'assets/images/tab-lash-02-frost-black.png',
                    modelImg: 'assets/images/lash-eye-frost-black.png',
                    openCaseImg: 'assets/images/product_lashes_case_open_transparent.png',
                    closedCaseImg: 'assets/images/case-linked-02-frost-black.png',
                    packagingImg: 'assets/images/packaging_color_coding_grid.png',
                    desc: 'توزيع خفيف ومسافات أوسع بين الخصل للحصول على إطلالة مرتبة تفتح العين وتناسب الروتين اليومي.'
                },
                'Green': {
                    title: 'Green',
                    price: '١٠٠ ريال',
                    priceOld: '١٣٠ ريال',
                    badge: 'Spiky',
                    theme: '#69A95A',
                    img: 'assets/images/tab-lash-03-bunny-black.png',
                    modelImg: 'assets/images/lash-eye-bunny-black.png',
                    openCaseImg: 'assets/images/product_lashes_case_open_transparent.png',
                    closedCaseImg: 'assets/images/case-linked-03-bunny-black.png',
                    packagingImg: 'assets/images/packaging_color_coding_grid.png',
                    desc: 'خصل Spiky جريئة ومدببة بإيقاع مرح ترفع العين وتبرزها بوضوح أمام الكاميرا وفي المناسبات.'
                },
                'Purple': {
                    title: 'Purple',
                    price: '١٠٠ ريال',
                    priceOld: '١٣٠ ريال',
                    badge: 'Dense',
                    theme: '#C09CEC',
                    img: 'assets/images/tab-lash-04-ice-black.png',
                    modelImg: 'assets/images/lash-eye-ice-black.png',
                    openCaseImg: 'assets/images/product_lashes_case_open_transparent.png',
                    closedCaseImg: 'assets/images/case-linked-04-ice-black.png',
                    packagingImg: 'assets/images/packaging_color_coding_grid.png',
                    desc: 'كثافة متقاربة وممتلئة ترسم خطاً أسود واضحاً وأنيقاً حول العين للوك المسائي والمناسبات.'
                },
                'Orange': {
                    title: 'Orange',
                    price: '١٠٠ ريال',
                    priceOld: '١٣٠ ريال',
                    badge: 'Everyday',
                    theme: '#FF9866',
                    img: 'assets/images/tab-lash-05-natural.png',
                    modelImg: 'assets/images/lash-eye-natural.png',
                    openCaseImg: 'assets/images/product_lashes_case_open_transparent.png',
                    closedCaseImg: 'assets/images/case-linked-05-natural.png',
                    packagingImg: 'assets/images/packaging_color_coding_grid.png',
                    desc: 'أقرب نتيجة للرموش الطبيعية؛ خصل متوازنة وخفيفة تمنح العين حضوراً مرتباً من دون مبالغة.'
                },
                'Yellow': {
                    title: 'Yellow',
                    price: '١٠٠ ريال',
                    priceOld: '١٣٠ ريال',
                    badge: 'Soft Full',
                    theme: '#D2C63D',
                    img: 'assets/images/tab-lash-06-morning-mist.png',
                    modelImg: 'assets/images/lash-eye-morning-mist.png',
                    openCaseImg: 'assets/images/product_lashes_case_open_transparent.png',
                    closedCaseImg: 'assets/images/case-linked-06-morning-mist.png',
                    packagingImg: 'assets/images/packaging_color_coding_grid.png',
                    desc: 'امتلاء ناعم بخصل دقيقة يفتح العين ويمنحها عمقاً ضبابياً ساحراً مناسباً للصباح والمساء.'
                }
            };
            
            // إضافة إمكانية النقر على كروت الرموش للانتقال لصفحتها التفصيلية
            productCards.forEach(card => {
                card.style.cursor = 'pointer';
                card.addEventListener('click', function(e) {
                    // التحقق من أن النقر لم يتم على زر الإضافة للسلة أو المفضلة لتجنب التداخل
                    if (e.target.closest('.btn-cart') || e.target.closest('.favorite-btn')) {
                        return; 
                    }
                    
                    const productTitleText = this.querySelector('.product-title').innerText.trim();
                    const data = productsDetailData[productTitleText];
                    
                    if (data) {
                        // تعبئة البيانات بالمعلومات الخاصة بالمنتج المختار
                        detailTitle.innerText = data.title;
                        detailPrice.innerText = data.price;
                        detailPriceOld.innerText = data.priceOld;
                        detailBadge.innerText = data.badge;
                        detailDesc.innerText = data.desc;
                        
                        // تخصيص شارة المنتج لتطابق التنسيق اللوني الأساسي
                        detailBadge.style.color = data.theme;
                        detailBadge.style.backgroundColor = `${data.theme}12`;
                        
                        // تعيين الصورة الأساسية للرمش نفسه في الخيار الأول وتحديث العارض الرئيسي
                        thumbProduct.setAttribute('data-img-src', data.img);
                        thumbModel.setAttribute('data-img-src', data.modelImg);
                        thumbOpenCase.setAttribute('data-img-src', data.openCaseImg);
                        thumbClosedCase.setAttribute('data-img-src', data.closedCaseImg);
                        thumbPackaging.setAttribute('data-img-src', data.packagingImg);
                        setWithFallback(thumbProductImage, data.img);
                        setWithFallback(thumbModelImage, data.modelImg);
                        setWithFallback(thumbOpenCaseImage, data.openCaseImg);
                        setWithFallback(thumbClosedCaseImage, data.closedCaseImg);
                        setWithFallback(thumbPackagingImage, data.packagingImg);
                        thumbProductImage.alt = `معاينة رمش ${data.title}`;
                        thumbModelImage.alt = `موديل ترتدي رمش ${data.title}`;
                        thumbClosedCaseImage.alt = `علبة ${data.title} مغلقة`;
                        thumbPackagingImage.alt = `باكج تغليف ${data.title}`;
                        detailMainImg.alt = `رموش ${data.title} على خلفية بيضاء`;
                        setWithFallback(detailMainImg, data.img);
                        
                        // إعادة ضبط زر الكمية والصور المصغرة النشطة
                        qtyValue.innerText = '1';
                        detailThumbs.forEach(t => t.classList.remove('active'));
                        thumbProduct.classList.add('active');
                        
                        // فتح الواجهة بشكل جذاب وتجميد حركة خلفية الصفحة الرئيسية
                        detailOverlay.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    }
                });
            });
            
            // زر الإغلاق للعودة
            closeDetailBtn.addEventListener('click', () => {
                detailOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            // تفاعل المربعات المصغرة المتطورة لتغيير صور التفاصيل
            detailThumbs.forEach(thumb => {
                thumb.addEventListener('click', function() {
                    detailThumbs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    
                    const newImg = this.getAttribute('data-img-src');
                    detailMainImg.style.opacity = '0';
                    detailMainImg.style.transform = 'scale(0.95)';
                    
                    setTimeout(() => {
                        setWithFallback(detailMainImg, newImg);
                        detailMainImg.style.opacity = '1';
                        detailMainImg.style.transform = 'scale(1)';
                    }, 200);
                });
            });
            
            // زيادة ونقصان الكمية
            qtyPlus.addEventListener('click', () => {
                let val = parseInt(qtyValue.innerText);
                if (val < 10) {
                    qtyValue.innerText = val + 1;
                }
            });
            
            qtyMinus.addEventListener('click', () => {
                let val = parseInt(qtyValue.innerText);
                if (val > 1) {
                    qtyValue.innerText = val - 1;
                }
            });
            
            // ========================================================
            // NEW JS: High-Fidelity Cart, Checkout, and Multi-page Logic
            // ========================================================
            
            // تهيئة حالة السلة البرمجية في الذاكرة لتخزين المنتجات
            let cart = [];
            let discountValueAmount = 0; // قيمة الخصم النشطة حالياً بالريال
            let activePromoCode = '';   // كود الخصم المطبق حالياً

            // مراجع لعناصر واجهة المستخدم الجديدة للعمليات
            const headerCartBtn = document.getElementById('headerCartBtn');
            const floatingCartBtn = document.getElementById('floatingCartBtn');
            const cartPageOverlay = document.getElementById('cartPageOverlay');
            const closeCartPageBtn = document.getElementById('closeCartPageBtn');
            const returnToBrowseBtn = document.getElementById('returnToBrowseBtn');
            
            const headerCartBadge = document.getElementById('headerCartBadge');
            const floatingCartBadge = document.getElementById('floatingCartBadge');
            
            const cartItemsContainer = document.getElementById('cartItemsContainer');
            const cartEmptyState = document.getElementById('cartEmptyState');
            const cartActiveGrid = document.getElementById('cartActiveGrid');
            
            const cartSubtotal = document.getElementById('cartSubtotal');
            const discountRow = document.getElementById('discountRow');
            const discountValue = document.getElementById('discountValue');
            const discountLabel = document.getElementById('discountLabel');
            const cartShipping = document.getElementById('cartShipping');
            const freeShippingMsg = document.getElementById('freeShippingMsg');
            const cartGrandTotal = document.getElementById('cartGrandTotal');
            
            const promoInput = document.getElementById('promoInput');
            const promoBtn = document.getElementById('promoBtn');
            const promoFeedback = document.getElementById('promoFeedback');
            
            const goToCheckoutBtn = document.getElementById('goToCheckoutBtn');
            const checkoutPageOverlay = document.getElementById('checkoutPageOverlay');
            const backToCartBtn = document.getElementById('backToCartBtn');
            
            const checkoutItemsBrief = document.getElementById('checkoutItemsBrief');
            const checkoutSubtotal = document.getElementById('checkoutSubtotal');
            const checkoutDiscountRow = document.getElementById('checkoutDiscountRow');
            const checkoutDiscountValue = document.getElementById('checkoutDiscountValue');
            const checkoutShipping = document.getElementById('checkoutShipping');
            const checkoutGrandTotal = document.getElementById('checkoutGrandTotal');
            const paymentBtnAmount = document.getElementById('paymentBtnAmount');
            
            const paymentMethodCards = document.querySelectorAll('.payment-method-card');
            const cardDetailsBlock = document.getElementById('cardDetailsBlock');
            const applePayBlock = document.getElementById('applePayBlock');
            const checkoutForm = document.getElementById('checkoutForm');
            
            const orderSuccessOverlay = document.getElementById('orderSuccessOverlay');
            const successBackToHomeBtn = document.getElementById('successBackToHomeBtn');
            const invoiceOrderNumber = document.getElementById('invoiceOrderNumber');
            const invoiceName = document.getElementById('invoiceName');
            const invoiceAddress = document.getElementById('invoiceAddress');
            const invoicePaymentMethod = document.getElementById('invoicePaymentMethod');
            const invoiceAmount = document.getElementById('invoiceAmount');

            // وظيفة إضافة منتج إلى سلة التسوق
            function addToCart(name, price, image, quantity = 1) {
                // البحث في حالة السلة إذا كان المنتج مضافاً سابقاً
                const existingProductIndex = cart.findIndex(item => item.name === name);
                
                if (existingProductIndex > -1) {
                    cart[existingProductIndex].quantity += quantity;
                } else {
                    cart.push({
                        name: name,
                        price: price, // رقمي دائمًا، مثال: 100
                        image: image,
                        quantity: quantity
                    });
                }
                
                updateCartBadges();
                renderCart();
            }

            // تحديث العدادات الرقمية للسلة في الهيدر والزر العائم مع تفعيل حركة الارتداد
            function updateCartBadges() {
                const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
                
                if (totalItems > 0) {
                    headerCartBadge.innerText = totalItems;
                    headerCartBadge.classList.add('active');
                    
                    floatingCartBadge.innerText = totalItems;
                    floatingCartBadge.classList.add('active');
                } else {
                    headerCartBadge.classList.remove('active');
                    floatingCartBadge.classList.remove('active');
                }

                // تفعيل تأثير الارتداد النابضي لتأكيد الإضافة بصرياً
                triggerCartBadgeBounce();
            }

            function triggerCartBadgeBounce() {
                headerCartBtn.classList.add('spring-bounce');
                floatingCartBtn.classList.add('spring-bounce');
                setTimeout(() => {
                    headerCartBtn.classList.remove('spring-bounce');
                    floatingCartBtn.classList.remove('spring-bounce');
                }, 600);
            }

            // بناء وعرض عناصر سلة التسوق وحساب الفاتورة ديناميكياً
            function renderCart() {
                cartItemsContainer.innerHTML = '';
                
                if (cart.length === 0) {
                    cartActiveGrid.style.display = 'none';
                    cartEmptyState.style.display = 'flex';
                    // إعادة تعيين الخصم في حال أصبحت السلة فارغة
                    discountValueAmount = 0;
                    activePromoCode = '';
                    promoInput.value = '';
                    promoFeedback.style.display = 'none';
                    discountRow.style.display = 'none';
                    return;
                }
                
                cartActiveGrid.style.display = 'grid';
                cartEmptyState.style.display = 'none';
                
                let subtotal = 0;
                
                cart.forEach((item, index) => {
                    const itemTotal = item.price * item.quantity;
                    subtotal += itemTotal;
                    
                    const itemHTML = `
                        <div class="cart-item-card">
                            <div class="cart-item-delete" data-index="${index}" title="إزالة من السلة">
                                <i class="fa-solid fa-trash-can"></i>
                            </div>
                            <div class="cart-item-price">${itemTotal} ريال</div>
                            <div class="cart-item-controls">
                                <div class="qty-selector" style="transform: scale(0.9);">
                                    <button class="qty-btn btn-cart-qty-minus" data-index="${index}"><i class="fa-solid fa-minus"></i></button>
                                    <span class="qty-num">${item.quantity}</span>
                                    <button class="qty-btn btn-cart-qty-plus" data-index="${index}"><i class="fa-solid fa-plus"></i></button>
                                </div>
                            </div>
                            <div class="cart-item-details">
                                <h4 class="cart-item-name">${item.name}</h4>
                                <span class="cart-item-style">رموش مغناطيسية ذكية</span>
                            </div>
                            <div class="cart-item-visual">
                                <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null; this.src='assets/images/ChatGPT Image Jun 21, 2026 at 01_52_20 PM.png';">
                            </div>
                        </div>
                    `;
                    cartItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
                });

                // تطبيق الخصم النشط إن وجد
                if (activePromoCode !== '') {
                    discountValueAmount = Math.round(subtotal * 0.10); // خصم 10%
                    discountRow.style.display = 'flex';
                    discountLabel.innerText = `خصم الكوبون (${activePromoCode})`;
                    discountValue.innerText = `-${discountValueAmount} ريال`;
                } else {
                    discountValueAmount = 0;
                    discountRow.style.display = 'none';
                }

                // حساب تكاليف الشحن والمجموع الكلي
                // ميزة الشحن المجاني للطلبات فوق 199 ريال (قبل احتساب الخصم)
                let shippingCost = 15;
                if (subtotal >= 199) {
                    shippingCost = 0;
                    freeShippingMsg.style.display = 'flex';
                    cartShipping.innerText = 'مجاني';
                    cartShipping.style.color = '#10b981';
                    cartShipping.style.fontWeight = '700';
                } else {
                    freeShippingMsg.style.display = 'none';
                    cartShipping.innerText = '15 ريال';
                    cartShipping.style.color = '';
                    cartShipping.style.fontWeight = '';
                }

                const grandTotal = Math.max(0, subtotal - discountValueAmount + shippingCost);

                // تحديث واجهة السلة
                cartSubtotal.innerText = `${subtotal} ريال`;
                cartGrandTotal.innerText = `${grandTotal} ريال`;

                // تعيين أحداث أزرار الكميات والحذف داخل السلة المرسومة ديناميكياً
                setupCartEventListeners();
            }

            // تعيين أحداث عناصر السلة التي تم إنشاؤها بالـ JS
            function setupCartEventListeners() {
                // زيادة الكمية داخل السلة
                document.querySelectorAll('.btn-cart-qty-plus').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const idx = parseInt(this.getAttribute('data-index'));
                        if (cart[idx].quantity < 10) {
                            cart[idx].quantity++;
                            updateCartBadges();
                            renderCart();
                        }
                    });
                });

                // تقليل الكمية داخل السلة
                document.querySelectorAll('.btn-cart-qty-minus').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const idx = parseInt(this.getAttribute('data-index'));
                        if (cart[idx].quantity > 1) {
                            cart[idx].quantity--;
                            updateCartBadges();
                            renderCart();
                        }
                    });
                });

                // حذف المنتج من السلة بالكامل
                document.querySelectorAll('.cart-item-delete').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const idx = parseInt(this.getAttribute('data-index'));
                        cart.splice(idx, 1);
                        updateCartBadges();
                        renderCart();
                    });
                });
            }

            // ========================================================
            // NEW: Real Interactive Promo Code Logic
            // ========================================================
            promoBtn.addEventListener('click', () => {
                const enteredCode = promoInput.value.trim().toUpperCase();
                
                if (enteredCode === '') {
                    showPromoFeedback('الرجاء كتابة رمز الكوبون أولاً.', 'var(--pink)');
                    return;
                }

                if (enteredCode === 'TAB10' || enteredCode === 'WELCOME') {
                    activePromoCode = enteredCode;
                    showPromoFeedback(`تم تطبيق الكوبون ${enteredCode} بنجاح! تم الحصول على خصم 10% ✨`, '#10b981');
                    renderCart();
                } else {
                    showPromoFeedback('عذراً، هذا الكوبون غير موجود أو منتهي الصلاحية.', 'var(--pink)');
                }
            });

            function showPromoFeedback(message, color) {
                promoFeedback.innerText = message;
                promoFeedback.style.color = color;
                promoFeedback.style.display = 'block';
            }

            // فتح وإغلاق السلة والصفحات التفاعلية
            headerCartBtn.addEventListener('click', () => {
                cartPageOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });

            floatingCartBtn.addEventListener('click', () => {
                cartPageOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });

            closeCartPageBtn.addEventListener('click', () => {
                cartPageOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });

            returnToBrowseBtn.addEventListener('click', () => {
                cartPageOverlay.classList.remove('active');
                document.body.style.overflow = '';
                // النزول لسكشن الرموش
                document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
            });

            // :الانتقال من سلة التسوق إلى صفحة الدفع والطلب
            goToCheckoutBtn.addEventListener('click', () => {
                // بناء ملخص الفاتورة المصغر لصفحة الدفع
                checkoutItemsBrief.innerHTML = '';
                let subtotal = 0;
                
                cart.forEach(item => {
                    subtotal += (item.price * item.quantity);
                    const itemHTML = `
                        <div style="display:flex; justify-content:space-between; align-items:center; font-size:13.5px; border-bottom:1px dashed var(--border-light); padding-bottom:8px; width:100%;">
                            <span style="color:var(--text-dark); font-weight:700;">${item.name} <span style="color:var(--purple); font-weight:500;">x${item.quantity}</span></span>
                            <span style="font-weight:700;">${item.price * item.quantity} ريال</span>
                        </div>
                    `;
                    checkoutItemsBrief.insertAdjacentHTML('beforeend', itemHTML);
                });

                if (discountValueAmount > 0) {
                    checkoutDiscountRow.style.display = 'flex';
                    checkoutDiscountValue.innerText = `-${discountValueAmount} ريال`;
                } else {
                    checkoutDiscountRow.style.display = 'none';
                }

                let shippingCost = subtotal >= 199 ? 0 : 15;
                const grandTotal = Math.max(0, subtotal - discountValueAmount + shippingCost);

                checkoutSubtotal.innerText = `${subtotal} ريال`;
                checkoutShipping.innerText = shippingCost === 0 ? 'مجاني' : '15 ريال';
                checkoutGrandTotal.innerText = `${grandTotal} ريال`;
                paymentBtnAmount.innerText = `${grandTotal} ريال`;

                // تحويل المظهر لصفحة الدفع
                cartPageOverlay.classList.remove('active');
                checkoutPageOverlay.classList.add('active');
            });

            // العودة من الشحن والدفع إلى سلة التسوق
            backToCartBtn.addEventListener('click', () => {
                checkoutPageOverlay.classList.remove('active');
                cartPageOverlay.classList.add('active');
            });

            // تفاعل تبديل طرق الدفع (بطاقة، Apple Pay، عند الاستلام)
            paymentMethodCards.forEach(card => {
                card.addEventListener('click', function() {
                    paymentMethodCards.forEach(c => c.classList.remove('active'));
                    this.classList.add('active');

                    const selectedMethod = this.getAttribute('data-method');

                    // إخفاء كافة الحقول الإضافية أولاً
                    cardDetailsBlock.classList.remove('active');
                    applePayBlock.classList.remove('active');

                    // إظهار الحقول المخصصة للخيار المحدد
                    if (selectedMethod === 'card') {
                        cardDetailsBlock.classList.add('active');
                        // جعل الحقول مطلوبة
                        document.getElementById('cardNum').required = true;
                        document.getElementById('cardExpiry').required = true;
                        document.getElementById('cardCVV').required = true;
                    } else {
                        // إزالة طلب المدخلات لتجنب منع الإرسال البرمجي
                        document.getElementById('cardNum').required = false;
                        document.getElementById('cardExpiry').required = false;
                        document.getElementById('cardCVV').required = false;

                        if (selectedMethod === 'applepay') {
                            applePayBlock.classList.add('active');
                        }
                    }
                });
            });

            // محاكي الضغط على أبل باي للشراء الفوري
            applePayBlock.addEventListener('dblclick', function() {
                // التحقق من ملء البيانات الأساسية أولاً
                if (validateShippingForm()) {
                    triggerOrderSuccess('Apple Pay');
                } else {
                    highlightEmptyFormFields();
                }
            });

            // إرسال نموذج الدفع والشحن المعتمد
            checkoutForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const activeMethod = document.querySelector('.payment-method-card.active').getAttribute('data-method');
                
                // تحقق إضافي تفاعلي من بطاقة الائتمان قبل إرسال الطلب الفعلي لمنع الأخطاء غير المكتملة
                if (activeMethod === 'card') {
                    const cardNum = document.getElementById('cardNum');
                    const cardExpiry = document.getElementById('cardExpiry');
                    const cardCVV = document.getElementById('cardCVV');
                    
                    let valid = true;
                    if (cardNum.value.trim().length < 19) {
                        highlightField(cardNum);
                        valid = false;
                    }
                    if (cardExpiry.value.trim().length < 5) {
                        highlightField(cardExpiry);
                        valid = false;
                    }
                    if (cardCVV.value.trim().length < 3) {
                        highlightField(cardCVV);
                        valid = false;
                    }
                    
                    if (!valid) return;
                }

                let methodText = 'مدى / فيزا';
                if (activeMethod === 'cod') {
                    methodText = 'الدفع عند الاستلام';
                } else if (activeMethod === 'applepay') {
                    methodText = 'Apple Pay';
                }

                triggerOrderSuccess(methodText);
            });

            function highlightField(el) {
                el.style.borderColor = 'var(--pink)';
                el.style.animation = 'shakeInput 0.4s ease';
                setTimeout(() => { el.style.animation = ''; }, 400);
                setTimeout(() => { el.style.borderColor = ''; }, 2500);
            }

            // التحقق السريع من اكتمال نموذج تفاصيل الشحن
            function validateShippingForm() {
                const name = document.getElementById('shippingName').value.trim();
                const phone = document.getElementById('shippingPhone').value.trim();
                const city = document.getElementById('shippingCity').value.trim();
                const addr = document.getElementById('shippingAddress').value.trim();

                return name !== '' && phone !== '' && city !== '' && addr !== '';
            }

            // إبراز الحقول الفارغة بنعومة مع تأثير اهتزاز (Shake)
            function highlightEmptyFormFields() {
                const fields = ['shippingName', 'shippingPhone', 'shippingCity', 'shippingAddress'];
                fields.forEach(fid => {
                    const el = document.getElementById(fid);
                    if (el.value.trim() === '') {
                        highlightField(el);
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                });
            }

            // إضافة ستايل الاهتزاز ديناميكياً
            const shakeStyle = document.createElement('style');
            shakeStyle.innerHTML = `
                @keyframes shakeInput {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-6px); }
                    50% { transform: translateX(4px); }
                    75% { transform: translateX(-4px); }
                }
            `;
            document.head.appendChild(shakeStyle);

            // تشغيل ومعالجة شاشة نجاح الطلب
            function triggerOrderSuccess(paymentMethod) {
                // توليد رقم طلب عشوائي راقي
                const randomOrderNum = `TAB-${Math.floor(10000 + Math.random() * 90000)}`;
                
                // ملء تفاصيل الفاتورة الرسمية النهائية للعميل
                invoiceOrderNumber.innerText = randomOrderNum;
                invoiceName.innerText = document.getElementById('shippingName').value;
                invoiceAddress.innerText = `${document.getElementById('shippingCity').value}، ${document.getElementById('shippingAddress').value}`;
                invoicePaymentMethod.innerText = paymentMethod;
                invoiceAmount.innerText = checkoutGrandTotal.innerText;

                // إظهار شاشة النجاح
                checkoutPageOverlay.classList.remove('active');
                orderSuccessOverlay.classList.add('active');
                
                // تشغيل احتفالية تساقط الكونفيتي الملونة
                launchSuccessConfetti();

                // تنظيف نموذج الشحن تمهيداً للطلب التالي
                checkoutForm.reset();
            }

            // ========================================================
            // NEW: Pure CSS/JS Confetti Celebration System
            // ========================================================
            function launchSuccessConfetti() {
                const container = document.getElementById('confettiCanvasContainer');
                container.innerHTML = '';
                const colors = ['#C09CEC', '#FF9866', '#FFFF98', '#FF98CB', '#98CBFF', '#B2E49F'];
                const particleCount = 120;

                for (let i = 0; i < particleCount; i++) {
                    const particle = document.createElement('div');
                    const size = Math.random() * 10 + 6;
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    
                    particle.style.position = 'absolute';
                    particle.style.width = `${size}px`;
                    particle.style.height = `${size}px`;
                    particle.style.backgroundColor = color;
                    particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
                    
                    // المواضع الابتدائية
                    particle.style.top = `-20px`;
                    particle.style.left = `${Math.random() * 100}%`;
                    
                    // توليد كيرف حركة انسيابي عشوائي
                    const duration = Math.random() * 2.5 + 2.5;
                    const rotate = Math.random() * 360;
                    
                    particle.style.transform = `rotate(${rotate}deg)`;
                    particle.style.opacity = Math.random();
                    
                    container.appendChild(particle);
                    
                    // تحريك الجزيئات باستخدام Keyframes مخصصة
                    particle.animate([
                        { transform: `translateY(0) rotate(${rotate}deg)`, opacity: 1 },
                        { transform: `translateY(110vh) translateX(${Math.random() * 100 - 50}px) rotate(${rotate + 720}deg)`, opacity: 0 }
                    ], {
                        duration: duration * 1000,
                        easing: 'cubic-bezier(0.1, 0.8, 0.25, 1)',
                        fill: 'forwards'
                    });
                }
            }

            // العودة للرئيسية وإعادة تعيين سلة التسوق وحالتها بالكامل
            successBackToHomeBtn.addEventListener('click', function() {
                cart = [];
                discountValueAmount = 0;
                activePromoCode = '';
                promoInput.value = '';
                promoFeedback.style.display = 'none';
                discountRow.style.display = 'none';
                
                updateCartBadges();
                renderCart();
                
                orderSuccessOverlay.classList.remove('active');
                document.body.style.overflow = '';
                
                // الصعود لأعلى الصفحة بسلاسة
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            // ربط أزرار "إضافة للسلة" في الكروت الرسمية للرموش
            const addCartButtons = document.querySelectorAll('.product-card .btn-cart');
            
            addCartButtons.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation(); // منع انتقال الصفحة لصفحة التفاصيل بالخطأ
                    
                    const card = this.closest('.product-card');
                    const title = card.querySelector('.product-title').innerText.trim();
                    const price = 100; // السعر القياسي
                    const image = card.querySelector('.product-img img').getAttribute('src');
                    
                    addToCart(title, price, image, 1);
                });
            });

            // ربط زر "إضافة إلى حقيبة التسوق" في نافذة تفاصيل الرمش التفصيلية
            addToCartDetail.addEventListener('click', function() {
                const title = detailTitle.innerText.split('(')[0].trim(); // استخراج الاسم العربي
                const price = 100;
                const image = thumbProduct.getAttribute('data-img-src');
                const qty = parseInt(qtyValue.innerText);
                
                addToCart(title, price, image, qty);
                
                // تحديث نص التوست
                toastProductName.innerText = title;
                cartSuccessToast.classList.add('show');
                
                // إغلاق التوست تلقائياً
                setTimeout(() => {
                    cartSuccessToast.classList.remove('show');
                }, 4000);
            });

            // معالجة التنسيق التلقائي لأرقام الكروت البنكية
            const cardNumInput = document.getElementById('cardNum');
            if (cardNumInput) {
                cardNumInput.addEventListener('input', function() {
                    // إزالة الأحرف غير الرقمية
                    let val = this.value.replace(/\D/g, '');
                    // تقسيم الأرقام لمجموعات رباعية مريحة
                    let formatted = val.match(/.{1,4}/g);
                    this.value = formatted ? formatted.join(' ') : '';
                });
            }

            const cardExpiryInput = document.getElementById('cardExpiry');
            if (cardExpiryInput) {
                cardExpiryInput.addEventListener('input', function() {
                    let val = this.value.replace(/\D/g, '');
                    if (val.length > 2) {
                        this.value = `${val.slice(0, 2)}/${val.slice(2, 4)}`;
                    } else {
                        this.value = val;
                    }
                });
            }

            // ========================================================
            // NEW: Mobile Navigation Drawer Toggle Handlers
            // ========================================================
            const mobileDrawer = document.getElementById('mobileDrawer');
            const mobileDrawerBackdrop = document.getElementById('mobileDrawerBackdrop');
            const closeMobileDrawerBtn = document.getElementById('closeMobileDrawerBtn');
            const drawerBrowseBtn = document.getElementById('drawerBrowseBtn');
            const drawerLinks = document.querySelectorAll('.drawer-link');
            
            // نستخدم آلية Event Delegation للإمساك بالنقر على زر الهامبرغر المنشأ ديناميكياً
            document.body.addEventListener('click', function(e) {
                if (e.target.closest('#hamburgerMenuBtn')) {
                    mobileDrawer.classList.add('active');
                    mobileDrawer.setAttribute('aria-hidden', 'false');
                    mobileDrawerBackdrop.classList.add('active');
                    document.body.classList.add('drawer-open');
                    document.body.style.overflow = 'hidden';
                    setTimeout(() => closeMobileDrawerBtn.focus(), 80);
                }
            });

            function closeMobileDrawer() {
                mobileDrawer.classList.remove('active');
                mobileDrawer.setAttribute('aria-hidden', 'true');
                mobileDrawerBackdrop.classList.remove('active');
                document.body.classList.remove('drawer-open');
                if (!document.querySelector('.mobile-content-page.active')) {
                    document.body.style.overflow = '';
                }
            }

            closeMobileDrawerBtn.addEventListener('click', closeMobileDrawer);
            mobileDrawerBackdrop.addEventListener('click', closeMobileDrawer);
            
            drawerBrowseBtn.addEventListener('click', () => {
                closeMobileDrawer();
                document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
            });

            drawerLinks.forEach(link => {
                link.addEventListener('click', closeMobileDrawer);
            });

            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape' && mobileDrawer.classList.contains('active')) closeMobileDrawer();
            });

            const scrollProgress = document.getElementById('scrollProgress');
            const updateScrollProgress = () => {
                if (!scrollProgress) return;
                const scrollable = document.documentElement.scrollHeight - window.innerHeight;
                const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
                scrollProgress.style.width = `${Math.min(100, Math.max(0, progress))}%`;
            };
            updateScrollProgress();
            window.addEventListener('scroll', updateScrollProgress, { passive: true });
        });


/* ==================== block 3 ==================== */
document.addEventListener('DOMContentLoaded', () => {
            const firstStudio = document.querySelector('.studio-swatch.active');
            if (firstStudio) firstStudio.style.setProperty('--active-theme-color', firstStudio.dataset.theme || '#FF98CB');
            document.querySelectorAll('.studio-swatch').forEach(btn => {
                btn.addEventListener('click', () => btn.style.setProperty('--active-theme-color', btn.dataset.theme || '#C09CEC'));
            });

            const subscribeForm = document.querySelector('.subscribe-form');
            if (subscribeForm) {
                subscribeForm.addEventListener('submit', () => {
                    const button = subscribeForm.querySelector('button');
                    const input = subscribeForm.querySelector('input[type="email"]');
                    if (!input || !input.checkValidity()) return;
                    const original = button.textContent;
                    button.textContent = 'تم التسجيل';
                    button.disabled = true;
                    setTimeout(() => { button.textContent = original; button.disabled = false; input.value = ''; }, 1800);
                });
            }

            const preloader = document.getElementById('tab-preloader');
            if (preloader) {
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    preloader.style.visibility = 'hidden';
                    setTimeout(() => preloader.remove(), 500);
                }, 650);
            }
        });
