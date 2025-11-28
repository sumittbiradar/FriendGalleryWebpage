const memories = [
    {
        image: 'default.JPG',
        date: 'March 15, 2024',
        title: 'The Stylish Group with a Junior',
        description: 'The iconic icons in their graduation best! Sachin looking sharp in red, Sid rocking that Sliver, and Darshan keeping it cool, Abhishek being the rowdy in black, Anil as usual the mansik, Prajwal looking normal(believe me that is a compliment) in white, and Shirish looking manly in black with Jaundice in his eyes.The beginning of our graduation celebrations and the perfect way to kick off our photoshoot.',
        expandedContent: {
            location: 'Jain College of Engineering',
            time: '4:30 PM',
            weather: 'Sunny with a perfect breeze',
            behindTheScenes: 'It took us 30 minutes to coordinate our poses!',
            funFact: 'This was actually our 5th attempt at getting everyone to look at the camera at the same time.',
            mood: 'Excited and slightly nervous about graduation'
        }
    },
    {
        image: 'default1.JPG',
        date: 'March 15, 2024',
        title: 'The Famous Group Huddle',
        description: 'When everyone decided to gang up on our friend in the teal blazer! Look at those genuine laughs - Anil barely keeping it together, Sachin with his signature smile, and Prajwal trying to maintain his balance. Pure chaos and pure joy!'
    },
    {
        image: 'default2.JPG',
        date: 'March 15, 2024',
        title: 'The Legendary Fall',
        description: 'That moment when "let\'s do something fun" turned into complete chaos! Everyone trying to hold their pose while laughing uncontrollably. Somehow the guy in sandals became the center of attention!'
    },
    {
        image: 'default3.JPG',
        date: 'March 15, 2024',
        title: 'The Dapper Squad',
        description: 'Our one attempt at being serious... which lasted about 2 seconds! From white blazers to that iconic red one, everyone brought their A-game. Though keeping a straight face was clearly not part of the plan!'
    },
    {
        image: 'default4.JPG',
        date: 'March 15, 2024',
        title: 'Family Pride',
        description: 'A proud moment captured forever. Standing tall with family, celebrating years of hard work and dedication. The traditional touch making this moment even more special.'
    },
    {
        image: 'default5.JPG',
        date: 'March 15, 2024',
        title: 'Perfect Pair',
        description: 'Some moments just capture themselves perfectly. The red blazer complementing the traditional saree, both smiling ear to ear. A beautiful moment frozen in time.'
    },
    {
        image: 'default6.JPG',
        date: 'March 15, 2024',
        title: 'Candid Chaos',
        description: 'The best photos are always unplanned! Just the boys being themselves - no poses, no pretense, just pure friendship and joy. Look at those genuine smiles and that infectious laughter!'
    },
    {
        image: 'default7.JPG',
        date: 'March 15, 2024',
        title: 'The Cool Crew',
        description: 'When we decided to show off our cool side! Some of us nailed it, others... well, let\'s just say we tried! But that\'s what makes it perfect - our perfectly imperfect squad!'
    },
    {
        image: 'default8.JPG',
        date: 'March 15, 2024',
        title: 'Last Day Vibes',
        description: 'The final gathering before we all head off on our separate paths. But no matter where we go, these memories, these laughs, and these friendships will always bring us back together.'
    }
];

let currentMemoryIndex = 0;

// This function picks a random memory to show on the page.
// Think of it like shuffling through a deck of photos and picking one!
function getRandomMemory() {
    currentMemoryIndex = Math.floor(Math.random() * memories.length);
    const memory = memories[currentMemoryIndex];

    // Update the big photo in the center
    document.getElementById('group-photo').src = `../images/${memory.image}`;

    // Add the title and story below the photo
    const memoryHTML = `
        <h3>${memory.date} - ${memory.title}</h3>
        <p>${memory.description}</p>
    `;

    document.getElementById('memory-description').innerHTML = memoryHTML;

    // If we had the expanded view open, let's close it
    document.getElementById('expanded-content').classList.remove('active');

}

// This handles the "Expand" button click - you know, when you want to see more details
// about a memory. It's like opening up a photo album to get a better look
function toggleExpandedContent() {
    const expandedContent = document.getElementById('expanded-content');

    if (!expandedContent.classList.contains('active')) {
        // Lock the background so you can focus on the memory
        document.body.style.overflow = 'hidden';
        expandedContent.classList.add('active');

        // Get all the juicy details about this memory
        const memory = memories[currentMemoryIndex];
        const content = `
            <h2>${memory.title}</h2>
            <div class="memory-content">
                <img src="../images/${memory.image}" alt="${memory.title}" class="main-image">
                <p class="memory-description">${memory.description}</p>
            </div>
        `;

        expandedContent.querySelector('.expanded-content-scroll').innerHTML = content;
    } else {
        // Time to close it up!
        expandedContent.classList.remove('active');

        // Give it a moment to animate before enabling scrolling again
        setTimeout(() => {
            document.body.style.overflow = 'auto';
        }, 500);
    }
}

// This is for showing a specific friend's photo collection
// It's like flipping to their section in our digital photo album
function showFriendImages(friend) {
    // First, hide everyone else's photos
    const allFriendImages = document.querySelectorAll('.friend-images');
    allFriendImages.forEach(function (imageContainer) {
        imageContainer.style.display = 'none';
    });

    // Now show this friend's photos
    const friendLower = friend.toLowerCase();
    const friendImagesDiv = document.getElementById(friendLower + '-images');

    if (friendImagesDiv) {
        friendImagesDiv.style.display = 'block';

        // Find the container for the images
        const container = friendImagesDiv.querySelector('.friend-image-container');
        if (container) {
            // Clear existing images to prevent duplicates if we click multiple times
            // But wait, if we clear it, we re-load every time. 
            // Let's check if it's empty. If not empty, we assume it's already loaded.
            if (container.children.length > 0) {
                return;
            }

            // Load images dynamically
            // We'll try to load images 1 through 100
            const maxImages = 100;

            for (let i = 1; i <= maxImages; i++) {
                findAndLoadMedia(friendLower, friendLower, i, (mediaElement) => {
                    mediaElement.className = 'friend-img';
                    mediaElement.alt = `${friend} Image ${i}`;

                    if (mediaElement.tagName === 'VIDEO') {
                        mediaElement.muted = true;
                        mediaElement.playsInline = true;
                        // mediaElement.autoplay = true; // Removed to save resources
                    }

                    container.appendChild(mediaElement);
                });
            }
        }
    }
}

// This opens up our F.R.I.E.N.D.S style memories page
// You know, like when you click that nostalgic button at the top right!
function toggleMemoriesPage() {
    const memoriesPage = document.querySelector('.memories-page');
    memoriesPage.classList.toggle('active');

    if (memoriesPage.classList.contains('active')) {
        // Lock the background scroll when viewing memories
        document.body.style.overflow = 'hidden';
        loadGalleryImages();
    } else {
        // Back to normal scrolling when we close
        document.body.style.overflow = 'auto';
    }
}

// This loads up all the photo stacks in our gallery
// Each stack is like a mini-album of a specific adventure
function loadGalleryImages() {
    const stacks = document.querySelectorAll('.gallery-stack');

    stacks.forEach(stack => {
        const folderName = stack.dataset.folder;
        const stackImagesContainer = stack.querySelector('.stack-images');
        const baseName = folderName.split('The One with the ')[1];

        // Clear out any old photos
        stackImagesContainer.innerHTML = '';

        // Load the first 4 photos for the preview stack
        // (We don't load all at once to save bandwidth)
        const maxStackItems = 4;
        const placeholders = [];

        // Create placeholders first to reserve slots
        for (let i = 0; i < maxStackItems; i++) {
            const placeholder = document.createElement('div');
            placeholder.className = 'stack-item placeholder'; // Add stack-item so it takes up the slot
            stackImagesContainer.appendChild(placeholder);
            placeholders.push(placeholder);
        }

        for (let i = 1; i <= maxStackItems; i++) {
            findAndLoadMedia(folderName, baseName, i, (mediaElement) => {
                console.log(`Loaded media for ${folderName} index ${i}:`, mediaElement.tagName);

                mediaElement.loading = 'lazy';  // This helps the page load faster
                mediaElement.classList.add('loading');

                // If it's a video, we want it to behave like a preview image
                if (mediaElement.tagName === 'VIDEO') {
                    mediaElement.muted = true;
                    mediaElement.playsInline = true;
                    // mediaElement.autoplay = true; // Removed to save resources
                }

                // Add common class for stack positioning
                mediaElement.classList.add('stack-item');

                // Once the image loads, make it look nice
                // For video, we can use onloadeddata
                const onLoad = function () {
                    mediaElement.classList.remove('loading');
                    mediaElement.classList.add('loaded');
                };

                if (mediaElement.tagName === 'IMG') {
                    mediaElement.onload = onLoad;
                    mediaElement.onerror = function () {
                        mediaElement.classList.remove('loading');
                        mediaElement.classList.add('error');
                    };
                } else {
                    mediaElement.onloadeddata = onLoad;
                    mediaElement.onerror = function () {
                        mediaElement.classList.remove('loading');
                        mediaElement.classList.add('error');
                    };
                }

                // Replace the placeholder with the actual media element
                // This preserves the order and prevents re-appending issues
                const placeholder = placeholders[i - 1];
                if (placeholder && placeholder.parentNode) {
                    placeholder.parentNode.replaceChild(mediaElement, placeholder);
                    // Update reference in case we need it (though we shouldn't)
                    placeholders[i - 1] = mediaElement;
                }
            });
        }
    });
}

// When the page loads, let's get everything ready!
window.onload = function () {
    getRandomMemory();  // Show a random memory to start

    // Set up the F.R.I.E.N.D.S button to load gallery images
    document.querySelector('.friends-button').addEventListener('click', function () {
        if (!document.querySelector('.memories-page').classList.contains('active')) {
            loadGalleryImages();
        }
    });

    // Change the memory every 24 hours - keeps things fresh!
    setInterval(getRandomMemory, 24 * 60 * 60 * 1000);
};

// Set up all our click handlers and event listeners
// This makes everything interactive and fun to use!
document.querySelectorAll('.gallery-stack').forEach(stack => {
    stack.addEventListener('click', function () {
        const folderName = this.dataset.folder;
        loadAllImagesFromFolder(folderName);
    });
});

// Close button for the memories page
document.querySelector('.close-memories').addEventListener('click', function () {
    const memoriesPage = document.querySelector('.memories-page');
    memoriesPage.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close button for the expanded content modal
document.querySelector('.close-modal').addEventListener('click', function () {
    toggleExpandedContent();
});

// Close button for the gallery
document.querySelector('.gallery-modal-close').addEventListener('click', function () {
    const modal = document.querySelector('.gallery-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Click outside to close - because that's just good UX!
document.querySelector('.gallery-modal').addEventListener('click', function (e) {
    if (e.target === this) {
        this.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Press Escape to close - power users love keyboard shortcuts!
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const modal = document.querySelector('.gallery-modal');
        if (modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

// This is the cool part - when you click on a gallery stack, it opens up
// a split view with thumbnails on the left and a big preview on the right
function loadAllImagesFromFolder(folderName) {
    const modal = document.querySelector('.gallery-modal');
    const modalTitle = document.querySelector('.gallery-modal-title');
    const galleryGrid = document.querySelector('.gallery-grid');

    // Set up our viewing area
    modalTitle.textContent = folderName;
    galleryGrid.innerHTML = `
        <div class="thumbnails-list"></div>
        <div class="preview-container"></div>
    `;

    const thumbnailsList = galleryGrid.querySelector('.thumbnails-list');
    const previewContainer = galleryGrid.querySelector('.preview-container');
    const baseName = folderName.split('The One with the ')[1];

    // Show the modal with style
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Now load up to 100 images from this adventure
    // (We might not have 100, but that's our max per folder)
    // Now load up to 100 images from this adventure
    // (We might not have 100, but that's our max per folder)
    const maxImages = 100;
    const placeholders = [];

    // Create placeholders first
    for (let i = 0; i < maxImages; i++) {
        const placeholder = document.createElement('div');
        placeholder.className = 'thumbnail placeholder';
        // Hide placeholders initially or style them to be invisible but take up space?
        // Actually, for a grid, invisible placeholders might look like gaps.
        // Let's make them display:none until replaced? 
        // But then we lose the ordering benefit if we just append.
        // We want them to exist in DOM order.
        // Let's style them as loading skeletons or just empty blocks.
        // For now, let's keep them in DOM but maybe invisible if empty.
        placeholder.style.display = 'none';
        thumbnailsList.appendChild(placeholder);
        placeholders.push(placeholder);
    }

    let loadedImages = 0;
    for (let i = 1; i <= maxImages; i++) {
        findAndLoadMedia(folderName, baseName, i, (mediaElement) => {
            loadedImages++;
            mediaElement.className = 'thumbnail';

            if (mediaElement.tagName === 'VIDEO') {
                mediaElement.muted = true;
                // mediaElement.loop = true; // Removed to save resources
                mediaElement.playsInline = true;
                // mediaElement.autoplay = true; // Removed to save resources
            }

            // Replace the placeholder
            const placeholder = placeholders[i - 1];
            if (placeholder && placeholder.parentNode) {
                // We want the media to be visible
                mediaElement.style.display = 'block';
                placeholder.parentNode.replaceChild(mediaElement, placeholder);
                placeholders[i - 1] = mediaElement; // Update ref
            }

            // Make it clickable to show in the preview
            mediaElement.addEventListener('click', function () {
                // Highlight the selected thumbnail
                document.querySelectorAll('.thumbnail').forEach(thumb =>
                    thumb.classList.remove('active'));
                mediaElement.classList.add('active');

                // Show it big and beautiful in the preview area
                previewContainer.innerHTML = '';

                let previewMedia;
                if (mediaElement.tagName === 'IMG') {
                    previewMedia = new Image();
                    previewMedia.src = this.src;
                } else {
                    previewMedia = document.createElement('video');
                    // Remove the time fragment so the video plays from the beginning
                    previewMedia.src = this.src.split('#')[0];
                    previewMedia.controls = true;
                    previewMedia.autoplay = true;
                }

                previewMedia.className = 'preview-image';
                previewContainer.appendChild(previewMedia);
            });

            // Auto-select the first image when it loads
            if (loadedImages === 1) {
                mediaElement.click();
            }
        });
    }
}

// Helper function to find and load media (image or video)
// It tries different extensions until it finds one that works
function findAndLoadMedia(folderName, baseName, index, onSuccess) {
    const extensions = ['jpg', 'jpeg', 'png', 'JPG', 'PNG', 'mp4', 'MP4', 'mov', 'MOV'];
    const encodedFolderName = encodeURIComponent(folderName);

    // Recursive helper to try extensions
    const tryLoad = (extIndex) => {
        if (extIndex >= extensions.length) return; // No more extensions to try

        const ext = extensions[extIndex];
        const isVideo = ['mp4', 'MP4', 'mov', 'MOV'].includes(ext);
        const src = `../images/${encodedFolderName}/${baseName}${index}.${ext}`;

        if (isVideo) {
            const video = document.createElement('video');
            video.preload = 'metadata'; // Load metadata to detect validity faster
            // Add #t=2 to start the thumbnail at 2 seconds (avoids black frames)
            video.src = src + '#t=2';
            video.onloadedmetadata = function () {
                onSuccess(video);
            };
            video.onerror = function () {
                tryLoad(extIndex + 1);
            };
        } else {
            const img = new Image();
            img.src = src;
            img.onload = function () {
                onSuccess(img);
            };
            img.onerror = function () {
                tryLoad(extIndex + 1);
            };
        }
    };

    tryLoad(0);
}