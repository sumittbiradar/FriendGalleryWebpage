// Memory data with your actual photos
const memories = [
    {
        image: 'default.JPG',  // First group photo with three friends
        date: 'March 15, 2024',
        title: 'The Stylish Trio',
        description: 'The iconic trio in their graduation best! Sachin looking sharp in black...'
    },
    {
        image: 'default1.JPG',  // Group huddle photo
        date: 'March 15, 2024',
        title: 'The Famous Group Huddle',
        description: 'When everyone decided to gang up on Prajwal! Look at those laughs - Anil barely keeping it together, Shirish with his signature smile, and everyone just living in the moment.'
    },
    {
        image: 'default2.JPG',  // Another group pose
        date: 'March 15, 2024',
        title: 'Squad Goals',
        description: 'The whole gang in their finest! From white blazers to that iconic red one, everyone brought their A-game. Though keeping a straight face was clearly not part of the plan!'
    },
    {
        image: 'default3.JPG',  // Family graduation photo
        date: 'March 15, 2024',
        title: 'Family Moments',
        description: 'A proud moment captured forever. The support system that got us through all those late-night study sessions and exam stress. Worth every minute of the journey!'
    },
    {
        image: 'default4.JPG',  // Silly group pose
        date: 'March 15, 2024',
        title: 'The Famous Fall',
        description: 'That moment when "let\'s do something fun" turned into complete chaos! Everyone trying to hold their pose while laughing uncontrollably. These are the moments we\'ll never forget!'
    },
    {
        image: 'default5.JPG',  // Formal group shot
        date: 'March 15, 2024',
        title: 'The Dapper Squad',
        description: 'Our one attempt at being serious... which lasted about 2 seconds after this shot! But hey, at least we got one proper photo for the family albums!'
    },
    {
        image: 'default6.JPG',  // Couple photo
        date: 'March 15, 2024',
        title: 'Perfect Pairs',
        description: 'Some moments just capture themselves perfectly. The smiles say it all - pure joy and celebration on our big day!'
    },
    {
        image: 'default7.JPG',  // Candid group shot
        date: 'March 15, 2024',
        title: 'Candid Chaos',
        description: 'The best photos are always unplanned! Just the boys being themselves, no poses, no pretense, just pure friendship and joy.'
    },
    {
        image: 'default8.JPG',  // Group pose with sunglasses
        date: 'March 15, 2024',
        title: 'The Cool Crew',
        description: 'When we decided to show off our cool side! Some of us nailed it, others... well, let\'s just say we tried! But that\'s what makes it perfect.'
    },
    {
        image: 'all.png',  // Additional group photo
        date: 'March 15, 2024',
        title: 'One Last Time',
        description: 'The final gathering before we all head off on our separate paths. But no matter where we go, these memories will always bring us back together.'
    }
];

// Function to display random memory
function displayRandomMemory() {
    const randomIndex = Math.floor(Math.random() * memories.length);
    const memory = memories[randomIndex];
    
    const photoElement = document.getElementById('group-photo');
    const descriptionElement = document.getElementById('memory-description');
    
    if (photoElement && descriptionElement) {
        // Update photo
        photoElement.src = `../images/${memory.image}`;
        photoElement.alt = memory.title;
        
        // Clear previous content
        descriptionElement.innerHTML = '';
        
        // Create title element
        const titleDiv = document.createElement('div');
        titleDiv.className = 'typing-title';
        descriptionElement.appendChild(titleDiv);
        
        // Create description element
        const descDiv = document.createElement('div');
        descDiv.className = 'typing-text';
        descriptionElement.appendChild(descDiv);
        
        // Type out title
        const titleText = `${memory.date} - ${memory.title}`;
        let titleIndex = 0;
        
        function typeTitle() {
            if (titleIndex < titleText.length) {
                const span = document.createElement('span');
                span.className = 'typing-letter';
                span.textContent = titleText[titleIndex];
                titleDiv.appendChild(span);
                titleIndex++;
                setTimeout(typeTitle, 50); // Adjust speed here (lower = faster)
            } else {
                // Start typing description after title
                typeDescription();
            }
        }
        
        // Type out description
        const descText = memory.description;
        let descIndex = 0;
        
        function typeDescription() {
            if (descIndex < descText.length) {
                const span = document.createElement('span');
                span.className = 'typing-letter';
                span.textContent = descText[descIndex];
                descDiv.appendChild(span);
                descIndex++;
                setTimeout(typeDescription, 30); // Adjust speed here (lower = faster)
            }
        }
        
        // Start the typing animation
        typeTitle();
    }
}

// Initialize when page loads
window.onload = function() {
    displayRandomMemory();
    setInterval(displayRandomMemory, 24 * 60 * 60 * 1000); // Refresh every 24 hours
};

// Add drag functionality
let isDragging = false;
let startY = 0;
let startTranslateY = 0;

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.querySelector('.expanded-content-inner');
    const handle = document.querySelector('.drag-handle');

    handle.addEventListener('mousedown', startDragging);
    document.addEventListener('mouseup', stopDragging);

    // Touch events
    handle.addEventListener('touchstart', startDragging);
    document.addEventListener('touchmove', handleTouchDrag);
    document.addEventListener('touchend', stopDragging);

    function startDragging(e) {
        isDragging = true;
        startY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
        modal.style.transition = 'none';
    }

    function handleTouchDrag(e) {
        if (!isDragging) return;

        e.preventDefault();
        const currentY = e.touches[0].clientY;
        const percentage = Math.max(0, Math.min(100, (currentY / window.innerHeight) * 100));
        
        modal.style.transform = `translate(-50%, ${percentage}%)`;

        if (percentage > 75) {
            stopDragging();
            toggleExpandedContent();
        }
    }

    function stopDragging() {
        if (!isDragging) return;
        isDragging = false;
    }
});

// Function to toggle expanded content
function toggleExpandedContent() {
    const expandedContent = document.getElementById('expanded-content');
    const modal = document.querySelector('.expanded-content-inner');
    
    if (!expandedContent.classList.contains('active')) {
        // Opening the modal
        document.body.style.overflow = 'hidden';
        expandedContent.classList.add('active');
        modal.style.transition = 'none';
        
        // Get the current memory from the displayed image
        const currentImage = document.getElementById('group-photo').src;
        const memory = memories.find(m => currentImage.includes(m.image)) || memories[0];
        
        const content = `
            <div class="memory-content">
                <div class="top-section">
                    <img src="../images/${memory.image}" alt="${memory.title}" class="main-image">
                    <p class="memory-description">${memory.description}</p>
                </div>
                
                <!-- Additional alternating photos -->
                <div class="additional-photos-section">
                    <div class="photo-left">
                        <div class="additional-photo">
                            <p style="color: white; text-align: center; padding: 20px;">Click to add photo</p>
                        </div>
                    </div>
                    <div class="photo-right">
                        <div class="additional-photo">
                            <p style="color: white; text-align: center; padding: 20px;">Click to add photo</p>
                        </div>
                    </div>
                    <div class="photo-left">
                        <div class="additional-photo">
                            <p style="color: white; text-align: center; padding: 20px;">Click to add photo</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        expandedContent.querySelector('.expanded-content-scroll').innerHTML = content;
        
        // Add mouse move event listener
        document.addEventListener('mousemove', handleMouseMove);
    } else {
        // Closing the modal
        expandedContent.classList.remove('active');
        document.removeEventListener('mousemove', handleMouseMove);
        modal.style.transition = 'transform 0.3s ease';
        modal.style.transform = 'translate(-50%, 100%)';
        setTimeout(() => {
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Handle mouse movement for modal sliding
function handleMouseMove(e) {
    const modal = document.querySelector('.expanded-content-inner');
    const expandedContent = document.getElementById('expanded-content');
    
    if (!expandedContent.classList.contains('active') || isDragging) return;

    const windowHeight = window.innerHeight;
    const mouseY = e.clientY;
    const scrollHeight = modal.scrollHeight;
    const viewportHeight = window.innerHeight;
    
    // Calculate percentage based on mouse position with more granular control
    const percentage = Math.max(0, Math.min(100, (mouseY / windowHeight) * 100));
    
    // Calculate scroll position based on content height
    const maxScroll = scrollHeight - viewportHeight;
    const scrollPosition = (percentage / 100) * maxScroll;
    
    // Apply transform and scroll with smooth animation
    requestAnimationFrame(() => {
        modal.style.transform = `translate(-50%, ${Math.min(percentage, 75)}%)`;
        modal.scrollTop = scrollPosition;
    });
    
    // Close if pulled down too far
    if (percentage > 75) {
        document.removeEventListener('mousemove', handleMouseMove);
        toggleExpandedContent();
    }
}

// Close modal when clicking outside content
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('expanded-content').addEventListener('click', function(e) {
        if (e.target === this) {
            toggleExpandedContent();
        }
    });

    // Prevent clicks on modal content from closing it
    document.querySelector('.expanded-content-inner').addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.getElementById('expanded-content').classList.contains('active')) {
            toggleExpandedContent();
        }
    });
});
