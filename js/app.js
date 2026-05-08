document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const initPlanner = () => {
        const destinationSelect = document.getElementById('destination');
        if (!destinationSelect) return; // Only run planner logic on planner pages
    const budgetRange = document.getElementById('budgetRange');
    const budgetValue = document.getElementById('budgetValue');
    const interestsTags = document.querySelectorAll('.tag');
    const generateBtn = document.getElementById('generateBtn');
    const suggestionsGrid = document.getElementById('suggestionsGrid');
    const timelineList = document.getElementById('timelineList');
    
    // Budget Labels Map
    const budgetMap = {
        '1': 'Budget',
        '2': 'Moderate',
        '3': 'Luxury'
    };

    // Update Budget Label
    budgetRange.addEventListener('input', (e) => {
        budgetValue.textContent = budgetMap[e.target.value];
        triggerLiveUpdate();
    });

    // Handle Tag Selection
    interestsTags.forEach(tag => {
        tag.addEventListener('click', () => {
            tag.classList.toggle('active');
            triggerLiveUpdate();
        });
    });

    destinationSelect.addEventListener('change', triggerLiveUpdate);

    // Initial load
    generateItinerary();

    // Debounce live updates
    let timeoutId;
    function triggerLiveUpdate() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            generateItinerary();
        }, 500); // Wait 500ms before triggering to avoid excessive re-renders
    }

    generateBtn.addEventListener('click', () => {
        generateItinerary();
        generateBtn.textContent = 'Updating...';
        setTimeout(() => {
            generateBtn.textContent = 'Update Itinerary';
        }, 800);
    });

    function getSelectedTags() {
        return Array.from(document.querySelectorAll('.tag.active')).map(tag => tag.dataset.value);
    }

    function generateItinerary() {
        const destVibe = destinationSelect.value;
        const budget = budgetRange.value;
        const tags = getSelectedTags();

        // Clear current
        suggestionsGrid.innerHTML = '';
        timelineList.innerHTML = '';

        // Generate Destinations Based on Preferences (Mock Logic)
        const destinations = getDestinations(destVibe, budget, tags);
        
        destinations.forEach((dest, index) => {
            const delay = index * 0.1;
            const card = document.createElement('div');
            card.className = 'destination-card';
            card.style.animationDelay = `${delay}s`;
            
            card.innerHTML = `
                <img src="${dest.image}" alt="${dest.name}" class="card-image" onerror="this.src='https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80'">
                <div class="card-content">
                    <h3 class="card-title">${dest.name}</h3>
                    <div class="card-match">${dest.match}% Match</div>
                    <p class="card-desc">${dest.desc}</p>
                </div>
            `;
            suggestionsGrid.appendChild(card);
        });

        // Generate Timeline
        const events = getTimeline(destVibe, tags);
        events.forEach((event, index) => {
            const delay = index * 0.15;
            const item = document.createElement('div');
            item.className = 'timeline-item';
            item.style.animationDelay = `${delay}s`;

            item.innerHTML = `
                <div class="timeline-time">${event.time}</div>
                <div class="timeline-title">${event.title}</div>
                <div class="timeline-desc">${event.desc}</div>
            `;
            timelineList.appendChild(item);
        });
    }

    // Mock Data Generators
    function getDestinations(vibe, budget, tags) {
        // Just mocking dynamic content based on selections
        const matchBase = 70 + (tags.length * 5);
        
        let pool = [];
        if(vibe === 'tropical' || vibe === 'any') {
            pool.push({ name: 'Bali, Indonesia', image: 'images/bali.jpg', desc: 'Lush jungles meets pristine beaches.'});
            pool.push({ name: 'Maldives', image: 'images/maldives.jpg', desc: 'Ultimate luxury and clear waters.'});
        }
        if(vibe === 'urban' || vibe === 'any') {
            pool.push({ name: 'Tokyo, Japan', image: 'images/tokyo.jpg', desc: 'Neon lights and vibrant city life.'});
            pool.push({ name: 'New York, USA', image: 'images/nyc.jpg', desc: 'The city that never sleeps.'});
        }
        if(vibe === 'mountain' || vibe === 'any') {
            pool.push({ name: 'Swiss Alps', image: 'images/alps.jpg', desc: 'Breathtaking peaks and fresh air.'});
            pool.push({ name: 'Banff, Canada', image: 'images/banff.jpg', desc: 'Crystal lakes and majestic mountains.'});
        }
        if(vibe === 'historical' || vibe === 'any') {
            pool.push({ name: 'Rome, Italy', image: 'images/rome.jpg', desc: 'Ancient ruins and incredible food.'});
            pool.push({ name: 'Kyoto, Japan', image: 'images/kyoto.jpg', desc: 'Historical temples and gardens.'});
        }

        // Shuffle and pick 2
        pool = pool.sort(() => 0.5 - Math.random()).slice(0, 2);

        return pool.map((item, i) => ({
            ...item,
            match: Math.min(99, matchBase + Math.floor(Math.random() * 10) - (i * 3))
        }));
    }

    function getTimeline(vibe, tags) {
        const schedule = [];
        
        schedule.push({
            time: 'Day 1 - 10:00 AM',
            title: 'Arrival & Welcome',
            desc: 'Check into your secure, premium accommodation.'
        });

        if (tags.includes('food')) {
            schedule.push({
                time: 'Day 1 - 1:00 PM',
                title: 'Culinary Exploration',
                desc: 'Local gastronomy tour to kick off the trip.'
            });
        }

        if (tags.includes('art')) {
            schedule.push({
                time: 'Day 2 - 10:00 AM',
                title: 'Museum Pass',
                desc: 'Exclusive access to top-rated galleries.'
            });
        } else if (tags.includes('nature')) {
            schedule.push({
                time: 'Day 2 - 08:00 AM',
                title: 'Morning Hike',
                desc: 'Guided nature trail with scenic views.'
            });
        } else {
             schedule.push({
                time: 'Day 2 - 11:00 AM',
                title: 'City Highlights',
                desc: 'Discover the main attractions.'
            });
        }

        if (tags.includes('relaxation')) {
             schedule.push({
                time: 'Day 2 - 4:00 PM',
                title: 'Spa Retreat',
                desc: 'Unwind with a premium wellness session.'
            });
        }

        schedule.push({
            time: 'Day 3 - 7:00 PM',
            title: 'Farewell Dinner',
            desc: 'A spectacular evening to conclude your journey.'
        });

        return schedule;
    }
    };
    initPlanner();

    // --- GLOBAL PROFILE & BOOKING LOGIC ---
    
    // Load Profile Data from LocalStorage
    const profileData = JSON.parse(localStorage.getItem('tripEngineProfile')) || {
        name: 'Alex Explorer',
        title: 'Pro Traveler',
        avatar: ''
    };
    const bookings = JSON.parse(localStorage.getItem('tripEngineBookings')) || [];

    // Apply Profile Data globally
    const applyProfileData = () => {
        const nameEl = document.getElementById('profileNameDisplay');
        const titleEl = document.getElementById('profileTitleDisplay');
        const avatarEls = document.querySelectorAll('.avatar');
        
        if(nameEl) nameEl.textContent = profileData.name;
        if(titleEl) titleEl.textContent = profileData.title;
        if(profileData.avatar) {
            avatarEls.forEach(el => {
                el.style.backgroundImage = `url(${profileData.avatar})`;
                el.style.backgroundSize = 'cover';
                el.style.backgroundPosition = 'center';
            });
        }
    };
    applyProfileData();

    // Profile Page Logic
    const editProfileBtn = document.getElementById('editProfileBtn');
    const editProfileModal = document.getElementById('editProfileModal');
    const closeProfileModal = document.getElementById('closeProfileModal');
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    const profileImageInput = document.getElementById('profileImageInput');

    if(editProfileBtn) {
        editProfileBtn.addEventListener('click', () => {
            document.getElementById('editNameInput').value = profileData.name;
            document.getElementById('editTitleInput').value = profileData.title;
            editProfileModal.classList.add('active');
        });

        closeProfileModal.addEventListener('click', () => editProfileModal.classList.remove('active'));

        saveProfileBtn.addEventListener('click', () => {
            profileData.name = document.getElementById('editNameInput').value || 'Alex Explorer';
            profileData.title = document.getElementById('editTitleInput').value || 'Pro Traveler';
            localStorage.setItem('tripEngineProfile', JSON.stringify(profileData));
            applyProfileData();
            editProfileModal.classList.remove('active');
        });

        if(profileImageInput) {
            profileImageInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if(file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        profileData.avatar = event.target.result;
                        localStorage.setItem('tripEngineProfile', JSON.stringify(profileData));
                        applyProfileData();
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
        
        // Render Upcoming Trips
        const upcomingContainer = document.getElementById('upcomingTripsContainer');
        if(upcomingContainer) {
            upcomingContainer.innerHTML = '';
            if(bookings.length === 0) {
                upcomingContainer.innerHTML = '<p class="text-muted">No upcoming trips. Book an experience today!</p>';
            } else {
                bookings.forEach(b => {
                    upcomingContainer.innerHTML += `
                        <div class="itinerary-card">
                            <div>
                                <h4>${b.packageTitle}</h4>
                                <p class="text-muted" style="margin-top: 0.3rem;">${b.dates} • ${b.travelers} Traveler(s)</p>
                            </div>
                            <span class="badge status-upcoming">Upcoming</span>
                        </div>
                    `;
                });
            }
        }
    }

    // Booking Page Logic
    const bookNowBtn = document.getElementById('bookNowBtn');
    const bookingModal = document.getElementById('bookingModal');
    const closeBookingModal = document.getElementById('closeBookingModal');
    const confirmBookingBtn = document.getElementById('confirmBookingBtn');

    if(bookNowBtn) {
        bookNowBtn.addEventListener('click', () => {
            bookingModal.classList.add('active');
        });
        
        closeBookingModal.addEventListener('click', () => bookingModal.classList.remove('active'));

        confirmBookingBtn.addEventListener('click', () => {
            const dates = document.getElementById('bookDates').value;
            const travelers = document.getElementById('bookTravelers').value;
            
            if(!dates) return alert('Please select travel dates.');

            const packageTitle = document.querySelector('.package-title').textContent;
            
            // Save Booking
            bookings.push({
                packageTitle,
                dates,
                travelers,
                timestamp: new Date().getTime()
            });
            localStorage.setItem('tripEngineBookings', JSON.stringify(bookings));

            confirmBookingBtn.textContent = 'Processing...';
            setTimeout(() => {
                bookingModal.classList.remove('active');
                alert('Booking Successful! Check your profile for details.');
                window.location.href = 'profile.html';
            }, 1000);
        });
    }

});
