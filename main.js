// Birthday Celebration Website JavaScript

class BirthdayCelebration {
    constructor() {
        this.isPlaying = false;
        this.currentTheme = 'light';
        this.slideshowInterval = null;
        this.currentSlide = 0;
        this.gameScores = {
            balloon: 0,
            trivia: 0,
            memory: 0
        };
        this.triviaQuestions = [
            {
                question: "What's their favorite color?",
                options: ["Blue", "Pink", "Green", "Purple"],
                correct: 0
            },
            {
                question: "What's their favorite hobby?",
                options: ["Reading", "Gaming", "Cooking", "Traveling"],
                correct: 1
            },
            {
                question: "What's their dream destination?",
                options: ["Paris", "Tokyo", "New York", "London"],
                correct: 2
            }
        ];
        this.currentTriviaQuestion = 0;
        this.memoryCards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.wishes = [
            {
                id: 1,
                author: "Best Friend",
                message: "Wishing you the happiest birthday filled with love and joy!",
                likes: 0
            },
            {
                id: 2,
                author: "Family Member", 
                message: "May this new year of life bring you endless happiness!",
                likes: 0
            },
            {
                id: 3,
                author: "Colleague",
                message: "Hope your special day is wonderful and memorable!",
                likes: 0
            }
        ];
        
        this.init();
    }

    init() {
        this.createParticles();
        this.setupEventListeners();
        this.startCountdown();
        this.setupTypewriter();
        this.setupScrollAnimations();
        this.initializeGames();
        this.setupBalloonAnimations();
        
        // Add entrance animations
        this.animateOnScroll();
    }

    createParticles() {
        const container = document.getElementById('particles-container');
        const colors = ['#FF69B4', '#FFD700', '#9966CC', '#00FFFF', '#FF1493'];
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            container.appendChild(particle);
        }
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('click', () => this.toggleTheme());

        // Smooth scrolling navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                target.scrollIntoView({ behavior: 'smooth' });
            });
        });

        // Start celebration button
        document.getElementById('start-celebration').addEventListener('click', () => {
            this.startCelebration();
        });

        // Floating balloons
        document.querySelectorAll('.balloon').forEach(balloon => {
            balloon.addEventListener('click', () => this.popBalloon(balloon));
        });

        // Cake interactions
        document.getElementById('blow-candles').addEventListener('click', () => this.blowCandles());
        document.getElementById('light-candles').addEventListener('click', () => this.lightCandles());
        document.getElementById('make-wish').addEventListener('click', () => this.makeWish());

        // Individual candles
        document.querySelectorAll('.candle').forEach(candle => {
            candle.addEventListener('click', () => this.toggleCandle(candle));
        });

        // Gallery controls
        document.getElementById('add-memory').addEventListener('click', () => this.addMemory());
        document.getElementById('slideshow-toggle').addEventListener('click', () => this.toggleSlideshow());

        // Gift boxes
        document.querySelectorAll('.gift-box').forEach(gift => {
            gift.addEventListener('click', () => this.unwrapGift(gift));
        });

        // Game buttons
        document.getElementById('start-balloon-game').addEventListener('click', () => this.startBalloonGame());
        document.getElementById('start-trivia').addEventListener('click', () => this.startTrivia());
        document.getElementById('start-memory').addEventListener('click', () => this.startMemoryGame());

        // Wish system
        document.getElementById('add-wish').addEventListener('click', () => this.addWish());
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.likeWish(btn);
            });
        });

        // Celebration controls
        document.getElementById('fireworks-btn').addEventListener('click', () => this.launchFireworks());
        document.getElementById('confetti-btn').addEventListener('click', () => this.launchConfetti());
        document.getElementById('music-btn').addEventListener('click', () => this.toggleMusic());
        document.getElementById('save-moment-btn').addEventListener('click', () => this.saveMoment());

        // Modal close
        document.querySelector('.modal-close').addEventListener('click', () => this.closeModal());
        document.getElementById('success-modal').addEventListener('click', (e) => {
            if (e.target.id === 'success-modal') this.closeModal();
        });

        // Click effects
        document.addEventListener('click', (e) => this.createClickEffect(e));

        // Window resize
        window.addEventListener('resize', () => this.handleResize());
    }

    toggleTheme() {
        const body = document.body;
        const themeIcon = document.querySelector('#theme-toggle i');
        
        if (this.currentTheme === 'light') {
            body.setAttribute('data-color-scheme', 'dark');
            themeIcon.className = 'fas fa-sun';
            this.currentTheme = 'dark';
        } else {
            body.setAttribute('data-color-scheme', 'light');
            themeIcon.className = 'fas fa-moon';
            this.currentTheme = 'light';
        }
        
        this.showMessage('Theme changed! ✨');
    }

    startCountdown() {
        const updateCountdown = () => {
            const now = new Date().getTime();
            const today = new Date();
            let birthday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
            
            // If birthday has passed today, set it to next year
            if (now > birthday.getTime()) {
                birthday.setFullYear(birthday.getFullYear() + 1);
            }
            
            const distance = birthday.getTime() - now;
            
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        };
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    setupTypewriter() {
        const title = document.getElementById('birthday-title');
        const text = title.textContent;
        title.textContent = '';
        title.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 500);
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = '0s';
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.timeline-item').forEach(item => {
            observer.observe(item);
        });
    }

    setupBalloonAnimations() {
        const balloons = document.querySelectorAll('.balloon');
        balloons.forEach((balloon, index) => {
            balloon.style.animationDelay = `${index * 0.5}s`;
            
            setInterval(() => {
                balloon.style.transform = `translateY(${Math.sin(Date.now() * 0.001 + index) * 10}px)`;
            }, 100);
        });
    }

    startCelebration() {
        this.launchConfetti();
        this.playSound('celebration');
        
        // Scroll to cake section
        document.getElementById('cake').scrollIntoView({ behavior: 'smooth' });
        
        // Add some sparkle effects
        this.createSparkles();
        
        this.showMessage('🎉 Let the celebration begin! 🎉');
    }

    popBalloon(balloon) {
        balloon.style.animation = 'pop 0.5s ease forwards';
        this.playSound('pop');
        
        setTimeout(() => {
            balloon.style.animation = 'float 3s ease-in-out infinite';
            balloon.style.animationDelay = `${Math.random() * 2}s`;
        }, 500);
        
        this.createHeartEffect(balloon);
    }

    // Cake functionality
    blowCandles() {
        const candles = document.querySelectorAll('.candle');
        candles.forEach((candle, index) => {
            setTimeout(() => {
                candle.classList.add('blown-out');
            }, index * 200);
        });
        
        this.playSound('blow');
        
        setTimeout(() => {
            const wishBtn = document.getElementById('make-wish');
            wishBtn.style.display = 'inline-flex';
            wishBtn.classList.add('animate-in');
        }, 1000);
    }

    lightCandles() {
        const candles = document.querySelectorAll('.candle');
        candles.forEach((candle, index) => {
            setTimeout(() => {
                candle.classList.remove('blown-out');
            }, index * 100);
        });
        
        this.playSound('light');
        document.getElementById('make-wish').style.display = 'none';
    }

    toggleCandle(candle) {
        candle.classList.toggle('blown-out');
        this.playSound(candle.classList.contains('blown-out') ? 'blow' : 'light');
        
        // Check if all candles are blown out
        const allCandles = document.querySelectorAll('.candle');
        const blownOut = document.querySelectorAll('.candle.blown-out');
        
        if (allCandles.length === blownOut.length) {
            setTimeout(() => {
                document.getElementById('make-wish').style.display = 'inline-flex';
            }, 500);
        } else {
            document.getElementById('make-wish').style.display = 'none';
        }
    }

    makeWish() {
        this.launchFireworks();
        this.launchConfetti();
        this.createSparkles();
        
        this.showModal('🌟 Wish Made! 🌟', 'Your special wish has been sent to the universe! May all your dreams come true! ✨');
        
        // Reset candles after wish
        setTimeout(() => {
            this.lightCandles();
        }, 3000);
    }

    // Gallery functionality
    addMemory() {
        const gallery = document.getElementById('photo-gallery');
        const memoryCount = gallery.children.length + 1;
        
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        photoItem.innerHTML = `
            <div class="photo-placeholder">
                <i class="fas fa-heart"></i>
                <span>New Memory ${memoryCount}</span>
            </div>
            <div class="photo-overlay">
                <p>A wonderful new memory added to our collection!</p>
            </div>
        `;
        
        gallery.appendChild(photoItem);
        
        // Animate in
        setTimeout(() => {
            photoItem.style.animation = 'slideInUp 0.5s ease-out';
        }, 100);
        
        this.showMessage('📸 New memory added!');
    }

    toggleSlideshow() {
        const btn = document.getElementById('slideshow-toggle');
        const icon = btn.querySelector('i');
        
        if (this.slideshowInterval) {
            clearInterval(this.slideshowInterval);
            this.slideshowInterval = null;
            btn.innerHTML = '<i class="fas fa-play"></i> Slideshow';
            this.showMessage('⏸️ Slideshow paused');
        } else {
            this.startSlideshow();
            btn.innerHTML = '<i class="fas fa-pause"></i> Stop';
            this.showMessage('▶️ Slideshow started');
        }
    }

    startSlideshow() {
        const photos = document.querySelectorAll('.photo-item');
        if (photos.length === 0) return;
        
        this.slideshowInterval = setInterval(() => {
            photos[this.currentSlide].classList.remove('active');
            this.currentSlide = (this.currentSlide + 1) % photos.length;
            photos[this.currentSlide].classList.add('active');
            
            photos[this.currentSlide].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }, 3000);
    }

    // Gift functionality
    unwrapGift(gift) {
        if (gift.classList.contains('unwrapped')) return;
        
        gift.classList.add('unwrapped');
        this.playSound('unwrap');
        
        setTimeout(() => {
            const content = gift.querySelector('.gift-content');
            content.classList.remove('hidden');
            content.style.animation = 'modalSlideIn 0.5s ease-out';
            
            this.launchConfetti();
            this.showMessage('🎁 Gift unwrapped!');
        }, 500);
        
        setTimeout(() => {
            gift.classList.remove('unwrapped');
            gift.querySelector('.gift-content').classList.add('hidden');
        }, 5000);
    }

    // Games functionality
    initializeGames() {
        this.setupMemoryCards();
    }

    startBalloonGame() {
        this.gameScores.balloon = 0;
        document.getElementById('balloon-score').textContent = '0';
        
        const gameArea = document.getElementById('game-balloons');
        gameArea.innerHTML = '';
        
        const colors = ['🎈', '🎈', '🎈', '🎈', '🎈'];
        const balloonColors = ['red', 'blue', 'green', 'yellow', 'purple'];
        
        for (let i = 0; i < 8; i++) {
            const balloon = document.createElement('div');
            balloon.className = 'game-balloon';
            balloon.textContent = colors[Math.floor(Math.random() * colors.length)];
            balloon.style.color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
            balloon.style.left = Math.random() * 80 + '%';
            balloon.style.top = Math.random() * 80 + '%';
            balloon.style.animationDelay = Math.random() * 2 + 's';
            
            balloon.addEventListener('click', () => {
                if (!balloon.classList.contains('popped')) {
                    balloon.classList.add('popped');
                    this.gameScores.balloon += 10;
                    document.getElementById('balloon-score').textContent = this.gameScores.balloon;
                    this.playSound('pop');
                    
                    setTimeout(() => {
                        balloon.remove();
                    }, 300);
                    
                    if (gameArea.children.length === 1) {
                        setTimeout(() => {
                            this.showMessage(`🎉 Game complete! Score: ${this.gameScores.balloon}`);
                        }, 300);
                    }
                }
            });
            
            gameArea.appendChild(balloon);
        }
    }

    startTrivia() {
        this.gameScores.trivia = 0;
        this.currentTriviaQuestion = 0;
        this.showTriviaQuestion();
    }

    showTriviaQuestion() {
        if (this.currentTriviaQuestion >= this.triviaQuestions.length) {
            this.showMessage(`🧠 Trivia complete! Score: ${this.gameScores.trivia}/${this.triviaQuestions.length}`);
            return;
        }
        
        const question = this.triviaQuestions[this.currentTriviaQuestion];
        document.getElementById('trivia-question').textContent = question.question;
        
        const optionsContainer = document.getElementById('trivia-options');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'trivia-option';
            button.textContent = option;
            button.addEventListener('click', () => this.answerTrivia(index, question.correct));
            optionsContainer.appendChild(button);
        });
        
        document.getElementById('trivia-score').textContent = `${this.gameScores.trivia}/${this.triviaQuestions.length}`;
    }

    answerTrivia(selectedIndex, correctIndex) {
        const options = document.querySelectorAll('.trivia-option');
        
        options.forEach((option, index) => {
            option.disabled = true;
            if (index === correctIndex) {
                option.classList.add('correct');
            } else if (index === selectedIndex && index !== correctIndex) {
                option.classList.add('incorrect');
            }
        });
        
        if (selectedIndex === correctIndex) {
            this.gameScores.trivia++;
            this.playSound('correct');
        } else {
            this.playSound('wrong');
        }
        
        this.currentTriviaQuestion++;
        setTimeout(() => {
            this.showTriviaQuestion();
        }, 2000);
    }

    setupMemoryCards() {
        const symbols = ['🎂', '🎈', '🎁', '🎉', '🎂', '🎈', '🎁', '🎉'];
        this.memoryCards = symbols.sort(() => Math.random() - 0.5);
    }

    startMemoryGame() {
        this.matchedPairs = 0;
        this.flippedCards = [];
        this.setupMemoryCards();
        
        const grid = document.getElementById('memory-grid');
        grid.innerHTML = '';
        
        this.memoryCards.forEach((symbol, index) => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.dataset.symbol = symbol;
            card.dataset.index = index;
            card.textContent = '?';
            
            card.addEventListener('click', () => this.flipMemoryCard(card));
            grid.appendChild(card);
        });
        
        document.getElementById('memory-score').textContent = '0/4';
    }

    flipMemoryCard(card) {
        if (card.classList.contains('flipped') || card.classList.contains('matched') || this.flippedCards.length >= 2) {
            return;
        }
        
        card.classList.add('flipped');
        card.textContent = card.dataset.symbol;
        this.flippedCards.push(card);
        
        if (this.flippedCards.length === 2) {
            setTimeout(() => {
                this.checkMemoryMatch();
            }, 1000);
        }
    }

    checkMemoryMatch() {
        const [card1, card2] = this.flippedCards;
        
        if (card1.dataset.symbol === card2.dataset.symbol) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            this.matchedPairs++;
            this.playSound('correct');
            
            document.getElementById('memory-score').textContent = `${this.matchedPairs}/4`;
            
            if (this.matchedPairs === 4) {
                setTimeout(() => {
                    this.showMessage('🃏 Memory game complete! Great job!');
                }, 500);
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '?';
            card2.textContent = '?';
            this.playSound('wrong');
        }
        
        this.flippedCards = [];
    }

    // Wish system
    addWish() {
        const author = document.getElementById('wish-author').value.trim();
        const message = document.getElementById('wish-message').value.trim();
        
        if (!author || !message) {
            this.showMessage('Please fill in both fields! 💌');
            return;
        }
        
        const wishId = Date.now();
        const newWish = {
            id: wishId,
            author: author,
            message: message,
            likes: 0
        };
        
        this.wishes.push(newWish);
        this.renderWish(newWish);
        
        // Clear form
        document.getElementById('wish-author').value = '';
        document.getElementById('wish-message').value = '';
        
        this.createFloatingWish(message);
        this.showMessage('💌 Wish sent with love!');
    }

    renderWish(wish) {
        const wishesGrid = document.getElementById('wishes-grid');
        const wishCard = document.createElement('div');
        wishCard.className = 'wish-card';
        wishCard.dataset.wish = wish.id;
        
        wishCard.innerHTML = `
            <div class="wish-front">
                <div class="wish-author">${wish.author}</div>
                <div class="wish-preview">${wish.message.substring(0, 20)}...</div>
            </div>
            <div class="wish-back">
                <p>${wish.message}</p>
                <div class="wish-likes">
                    <button class="like-btn"><i class="fas fa-heart"></i> <span>${wish.likes}</span></button>
                </div>
            </div>
        `;
        
        wishCard.querySelector('.like-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.likeWish(wishCard.querySelector('.like-btn'));
        });
        
        wishesGrid.appendChild(wishCard);
        
        // Animate in
        setTimeout(() => {
            wishCard.style.animation = 'slideInUp 0.5s ease-out';
        }, 100);
    }

    likeWish(button) {
        button.classList.add('liked');
        const span = button.querySelector('span');
        const currentLikes = parseInt(span.textContent);
        span.textContent = currentLikes + 1;
        
        this.createHeartEffect(button);
        this.playSound('like');
        
        setTimeout(() => {
            button.classList.remove('liked');
        }, 600);
    }

    // Effects and animations
    launchFireworks() {
        const container = document.getElementById('fireworks-container');
        const colors = ['#FF69B4', '#FFD700', '#9966CC', '#00FFFF', '#FF1493'];
        
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.className = 'firework';
                firework.style.left = Math.random() * 100 + '%';
                firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                container.appendChild(firework);
                
                setTimeout(() => {
                    this.createFireworkExplosion(firework);
                    firework.remove();
                }, 1500);
            }, i * 200);
        }
        
        this.playSound('fireworks');
    }

    createFireworkExplosion(firework) {
        const rect = firework.getBoundingClientRect();
        const colors = ['#FF69B4', '#FFD700', '#9966CC', '#00FFFF', '#FF1493'];
        
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework-explosion';
            particle.style.left = rect.left + 'px';
            particle.style.top = rect.top + 'px';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.width = '6px';
            particle.style.height = '6px';
            
            const angle = (i * 30) * Math.PI / 180;
            const velocity = 100;
            const deltaX = Math.cos(angle) * velocity;
            const deltaY = Math.sin(angle) * velocity;
            
            particle.style.setProperty('--delta-x', deltaX + 'px');
            particle.style.setProperty('--delta-y', deltaY + 'px');
            
            document.getElementById('fireworks-container').appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    }

    launchConfetti() {
        const container = document.getElementById('confetti-container');
        const colors = ['#FF69B4', '#FFD700', '#9966CC', '#00FFFF', '#FF1493'];
        const shapes = ['square', 'circle', 'triangle'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDelay = Math.random() * 1 + 's';
                
                const shape = shapes[Math.floor(Math.random() * shapes.length)];
                if (shape === 'circle') {
                    confetti.style.borderRadius = '50%';
                } else if (shape === 'triangle') {
                    confetti.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
                }
                
                container.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 3000);
            }, i * 50);
        }
        
        this.playSound('confetti');
    }

    createSparkles() {
        const sparkleCount = 20;
        for (let i = 0; i < sparkleCount; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.textContent = '✨';
                sparkle.style.position = 'fixed';
                sparkle.style.left = Math.random() * window.innerWidth + 'px';
                sparkle.style.top = Math.random() * window.innerHeight + 'px';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.fontSize = '20px';
                sparkle.style.zIndex = '9999';
                sparkle.style.animation = 'sparkle 2s ease-out forwards';
                
                document.body.appendChild(sparkle);
                
                setTimeout(() => {
                    sparkle.remove();
                }, 2000);
            }, i * 100);
        }
    }

    createHeartEffect(element) {
        const rect = element.getBoundingClientRect();
        const heart = document.createElement('div');
        heart.textContent = '❤️';
        heart.className = 'click-effect';
        heart.style.left = rect.left + rect.width / 2 + 'px';
        heart.style.top = rect.top + 'px';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 1000);
    }

    createFloatingWish(message) {
        const wish = document.createElement('div');
        wish.textContent = '💌';
        wish.style.position = 'fixed';
        wish.style.left = '50%';
        wish.style.top = '50%';
        wish.style.transform = 'translate(-50%, -50%)';
        wish.style.fontSize = '30px';
        wish.style.pointerEvents = 'none';
        wish.style.zIndex = '9999';
        wish.style.animation = 'floatUp 3s ease-out forwards';
        
        document.body.appendChild(wish);
        
        setTimeout(() => {
            wish.remove();
        }, 3000);
    }

    createClickEffect(event) {
        const effects = ['✨', '⭐', '💫', '🌟'];
        const effect = document.createElement('div');
        effect.textContent = effects[Math.floor(Math.random() * effects.length)];
        effect.className = 'click-effect';
        effect.style.left = event.clientX + 'px';
        effect.style.top = event.clientY + 'px';
        
        document.body.appendChild(effect);
        
        setTimeout(() => {
            effect.remove();
        }, 1000);
    }

    // Sound system (simulated)
    playSound(type) {
        // In a real implementation, this would play actual sounds
        console.log(`Playing sound: ${type}`);
        
        // Visual feedback for sound
        const soundIndicator = document.createElement('div');
        soundIndicator.textContent = '🔊';
        soundIndicator.style.position = 'fixed';
        soundIndicator.style.top = '10px';
        soundIndicator.style.left = '50%';
        soundIndicator.style.transform = 'translateX(-50%)';
        soundIndicator.style.fontSize = '20px';
        soundIndicator.style.zIndex = '9999';
        soundIndicator.style.animation = 'fadeOut 1s ease-out forwards';
        
        document.body.appendChild(soundIndicator);
        
        setTimeout(() => {
            soundIndicator.remove();
        }, 1000);
    }

    toggleMusic() {
        const btn = document.getElementById('music-btn');
        
        if (this.isPlaying) {
            btn.innerHTML = '🎵 Music';
            this.isPlaying = false;
            this.showMessage('🔇 Music paused');
        } else {
            btn.innerHTML = '⏸️ Pause';
            this.isPlaying = true;
            this.showMessage('🎵 Music playing');
        }
        
        this.playSound('music');
    }

    saveMoment() {
        this.showMessage('📷 Moment saved! Creating memories... ✨');
        this.createSparkles();
        
        // Simulate screenshot effect
        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.top = '0';
        flash.style.left = '0';
        flash.style.right = '0';
        flash.style.bottom = '0';
        flash.style.backgroundColor = 'white';
        flash.style.opacity = '0.8';
        flash.style.zIndex = '9998';
        flash.style.pointerEvents = 'none';
        flash.style.animation = 'flash 0.3s ease-out';
        
        document.body.appendChild(flash);
        
        setTimeout(() => {
            flash.remove();
        }, 300);
    }

    // Modal system
    showModal(title, message) {
        const modal = document.getElementById('success-modal');
        const modalMessage = document.getElementById('modal-message');
        const modalTitle = modal.querySelector('h2');
        
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        modal.classList.remove('hidden');
    }

    closeModal() {
        document.getElementById('success-modal').classList.add('hidden');
    }

    showMessage(message) {
        // Create a temporary message element
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.style.position = 'fixed';
        messageElement.style.top = '100px';
        messageElement.style.left = '50%';
        messageElement.style.transform = 'translateX(-50%)';
        messageElement.style.background = 'var(--color-primary)';
        messageElement.style.color = 'var(--color-btn-primary-text)';
        messageElement.style.padding = '12px 24px';
        messageElement.style.borderRadius = '25px';
        messageElement.style.zIndex = '9999';
        messageElement.style.boxShadow = 'var(--shadow-lg)';
        messageElement.style.animation = 'slideInUp 0.5s ease-out, fadeOut 0.5s ease-out 2.5s forwards';
        
        document.body.appendChild(messageElement);
        
        setTimeout(() => {
            messageElement.remove();
        }, 3000);
    }

    handleResize() {
        // Adjust particle positions and other responsive elements
        this.createParticles();
    }

    animateOnScroll() {
        // Add more scroll-based animations
        const elements = document.querySelectorAll('.card, .photo-item, .game-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Additional CSS animations that need to be added via JavaScript
const additionalStyles = `
@keyframes fadeOut {
    0% { opacity: 1; }
    100% { opacity: 0; }
}

@keyframes flash {
    0% { opacity: 0; }
    50% { opacity: 0.8; }
    100% { opacity: 0; }
}

@keyframes sparkle {
    0% { transform: scale(0) rotate(0deg); opacity: 1; }
    100% { transform: scale(1.5) rotate(360deg); opacity: 0; }
}

@keyframes floatUp {
    0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    100% { transform: translate(-50%, -300px) scale(1.5); opacity: 0; }
}
`;

// Add additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new BirthdayCelebration();
});

// Add some fun global click interactions
document.addEventListener('click', (e) => {
    if (Math.random() < 0.1) { // 10% chance
        const surprises = ['🎉', '🎊', '✨', '🎈', '💝'];
        const surprise = surprises[Math.floor(Math.random() * surprises.length)];
        
        const element = document.createElement('div');
        element.textContent = surprise;
        element.style.position = 'fixed';
        element.style.left = e.clientX + 'px';
        element.style.top = e.clientY + 'px';
        element.style.pointerEvents = 'none';
        element.style.fontSize = '24px';
        element.style.zIndex = '9999';
        element.style.animation = 'clickEffect 1s ease-out forwards';
        
        document.body.appendChild(element);
        
        setTimeout(() => {
            element.remove();
        }, 1000);
    }
});
