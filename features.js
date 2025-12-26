// ============================================
// 🍳 טעם של בית - פיצ'רים מיוחדים
// ============================================

// ============================================
// 1. "מה יש במקרר?" - חיפוש לפי מרכיבים
// ============================================

// רשימת כל המרכיבים האפשריים (מחולץ מהמתכונים)
const allIngredients = [
    // ירקות
    "עגבניות", "בצל", "שום", "פלפל", "מלפפון", "חציל", "קישוא", "גזר", 
    "תפוחי אדמה", "כרוב", "סלק", "פטריות", "אבוקדו", "מנגולד",
    // חלבונים
    "ביצים", "עוף", "בשר טחון", "דג", "סלמון",
    // מוצרי חלב
    "חלב", "חמאה", "גבינה צהובה", "גבינה בולגרית", "גבינת שמנת", 
    "שמנת", "יוגורט", "מסקרפונה", "פטה",
    // קטניות ודגנים
    "חומוס", "עדשים", "שעועית", "אורז", "קוסקוס", "בורגול", 
    "קינואה", "פתיתים", "פסטה", "קמח", "סולת", "שיבולת שועל",
    // תבלינים
    "כמון", "פפריקה", "כורכום", "קינמון", "בזיליקום", "פטרוזיליה", 
    "כוסברה", "נענע", "רוזמרין", "תימין", "אורגנו",
    // אחרים
    "שמן זית", "טחינה", "לימון", "שוקולד", "סוכר", "דבש", 
    "שמרים", "אגוזים", "שקדים", "צנוברים", "צימוקים", "תמרים"
];

// State לחיפוש מרכיבים
let fridgeState = {
    selectedIngredients: [],
    isOpen: false
};

// פונקציה לחיפוש מתכונים לפי מרכיבים
function searchByIngredients(selectedIngredients) {
    if (selectedIngredients.length === 0) return [];
    
    return recipes.map(recipe => {
        // בודקים כמה מהמרכיבים שנבחרו נמצאים במתכון
        const recipeIngrText = recipe.ingr.join(' ').toLowerCase();
        let matchCount = 0;
        let matchedIngredients = [];
        
        selectedIngredients.forEach(ing => {
            if (recipeIngrText.includes(ing.toLowerCase())) {
                matchCount++;
                matchedIngredients.push(ing);
            }
        });
        
        // אחוז התאמה
        const matchPercentage = Math.round((matchCount / selectedIngredients.length) * 100);
        
        return {
            ...recipe,
            matchCount,
            matchedIngredients,
            matchPercentage
        };
    })
    .filter(r => r.matchCount > 0)
    .sort((a, b) => b.matchPercentage - a.matchPercentage || b.matchCount - a.matchCount);
}

// רנדור המודל של "מה יש במקרר"
function renderFridgeModal() {
    const matchedRecipes = searchByIngredients(fridgeState.selectedIngredients);
    
    return `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" id="fridgeModal">
        <div class="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
            <!-- Header -->
            <div class="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 text-white">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                            <span class="text-2xl">🧊</span>
                        </div>
                        <div>
                            <h2 class="text-2xl font-bold">מה יש במקרר?</h2>
                            <p class="text-white/80 text-sm">בחרו מרכיבים ונמצא לכם מתכונים!</p>
                        </div>
                    </div>
                    <button onclick="closeFridgeModal()" class="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                </div>
                
                <!-- מרכיבים שנבחרו -->
                ${fridgeState.selectedIngredients.length > 0 ? `
                <div class="mt-4 flex flex-wrap gap-2">
                    ${fridgeState.selectedIngredients.map(ing => `
                        <span class="px-3 py-1.5 bg-white/20 rounded-full text-sm flex items-center gap-2">
                            ${ing}
                            <button onclick="removeIngredient('${ing}')" class="hover:text-red-200">×</button>
                        </span>
                    `).join('')}
                    <button onclick="clearAllIngredients()" class="px-3 py-1.5 bg-red-500/50 rounded-full text-sm hover:bg-red-500/70 transition-colors">
                        נקה הכל
                    </button>
                </div>
                ` : ''}
            </div>
            
            <!-- Content -->
            <div class="flex-1 overflow-y-auto p-6">
                <!-- בחירת מרכיבים -->
                <div class="mb-6">
                    <h3 class="text-lg font-bold text-gray-800 mb-3">בחרו מרכיבים:</h3>
                    
                    <!-- חיפוש מהיר -->
                    <div class="relative mb-4">
                        <input type="text" id="ingredientSearch" placeholder="חפשו מרכיב..." 
                            class="w-full p-3 pr-10 rounded-xl border border-gray-200 focus:border-cyan-400 outline-none"
                            oninput="filterIngredients(this.value)">
                        <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                        </svg>
                    </div>
                    
                    <!-- רשימת מרכיבים -->
                    <div class="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-2" id="ingredientsList">
                        ${allIngredients.map(ing => `
                            <button onclick="toggleIngredient('${ing}')" 
                                class="ingredient-btn px-3 py-2 rounded-xl text-sm font-medium transition-all
                                ${fridgeState.selectedIngredients.includes(ing) 
                                    ? 'bg-cyan-500 text-white shadow-lg' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
                                data-ingredient="${ing}">
                                ${ing}
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <!-- תוצאות -->
                ${fridgeState.selectedIngredients.length > 0 ? `
                <div>
                    <h3 class="text-lg font-bold text-gray-800 mb-3">
                        ${matchedRecipes.length > 0 
                            ? `🎉 מצאנו ${matchedRecipes.length} מתכונים!` 
                            : '😔 לא מצאנו מתכונים מתאימים'}
                    </h3>
                    
                    ${matchedRecipes.length > 0 ? `
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        ${matchedRecipes.slice(0, 8).map(r => `
                            <div class="flex gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 cursor-pointer transition-colors"
                                onclick="closeFridgeModal();state.modal=recipes.find(rec=>rec.id===${r.id});render();">
                                <img src="${r.img}" alt="${r.title}" class="w-20 h-20 rounded-xl object-cover flex-shrink-0">
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center gap-2 mb-1">
                                        <span class="px-2 py-0.5 bg-cyan-100 text-cyan-700 rounded-full text-xs font-bold">
                                            ${r.matchPercentage}% התאמה
                                        </span>
                                    </div>
                                    <h4 class="font-bold text-gray-800 truncate">${r.title}</h4>
                                    <p class="text-sm text-gray-500 truncate">${r.subtitle}</p>
                                    <p class="text-xs text-cyan-600 mt-1">
                                        מרכיבים תואמים: ${r.matchedIngredients.join(', ')}
                                    </p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    ` : `
                    <div class="text-center py-8">
                        <span class="text-4xl">🥗</span>
                        <p class="text-gray-500 mt-2">נסו להוסיף עוד מרכיבים</p>
                    </div>
                    `}
                </div>
                ` : `
                <div class="text-center py-12">
                    <span class="text-6xl">👆</span>
                    <p class="text-gray-500 mt-4 text-lg">בחרו מרכיבים מהרשימה למעלה</p>
                </div>
                `}
            </div>
        </div>
    </div>
    `;
}

function openFridgeModal() {
    fridgeState.isOpen = true;
    document.body.insertAdjacentHTML('beforeend', renderFridgeModal());
}

function closeFridgeModal() {
    fridgeState.isOpen = false;
    const modal = document.getElementById('fridgeModal');
    if (modal) modal.remove();
}

function toggleIngredient(ingredient) {
    const index = fridgeState.selectedIngredients.indexOf(ingredient);
    if (index > -1) {
        fridgeState.selectedIngredients.splice(index, 1);
    } else {
        fridgeState.selectedIngredients.push(ingredient);
    }
    // רענון המודל
    const modal = document.getElementById('fridgeModal');
    if (modal) {
        modal.outerHTML = renderFridgeModal();
    }
}

function removeIngredient(ingredient) {
    fridgeState.selectedIngredients = fridgeState.selectedIngredients.filter(i => i !== ingredient);
    const modal = document.getElementById('fridgeModal');
    if (modal) {
        modal.outerHTML = renderFridgeModal();
    }
}

function clearAllIngredients() {
    fridgeState.selectedIngredients = [];
    const modal = document.getElementById('fridgeModal');
    if (modal) {
        modal.outerHTML = renderFridgeModal();
    }
}

function filterIngredients(searchTerm) {
    const buttons = document.querySelectorAll('.ingredient-btn');
    buttons.forEach(btn => {
        const ing = btn.dataset.ingredient;
        if (ing.includes(searchTerm)) {
            btn.style.display = '';
        } else {
            btn.style.display = 'none';
        }
    });
}


// ============================================
// 2. בישול קולי - הקראת מתכונים
// ============================================

let voiceState = {
    isPlaying: false,
    currentStep: 0,
    utterance: null,
    recipe: null
};

// פונקציה להקראת מתכון
function startVoiceCooking(recipe) {
    if (!('speechSynthesis' in window)) {
        showToast('הדפדפן לא תומך בהקראה 😔');
        return;
    }
    
    voiceState.recipe = recipe;
    voiceState.currentStep = 0;
    voiceState.isPlaying = true;
    
    // הצגת ממשק בישול קולי
    showVoiceInterface();
    
    // התחלת הקראה
    speakStep(0);
}

function showVoiceInterface() {
    const recipe = voiceState.recipe;
    const voiceUI = `
    <div id="voiceInterface" class="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 shadow-2xl transform transition-transform duration-300">
        <div class="max-w-2xl mx-auto">
            <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                        <span class="text-xl">🎙️</span>
                    </div>
                    <div>
                        <h3 class="font-bold">${recipe.title}</h3>
                        <p class="text-white/70 text-sm">בישול קולי פעיל</p>
                    </div>
                </div>
                <button onclick="stopVoiceCooking()" class="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
            </div>
            
            <!-- Progress Bar -->
            <div class="mb-3">
                <div class="flex justify-between text-sm text-white/70 mb-1">
                    <span>שלב ${voiceState.currentStep + 1} מתוך ${recipe.inst.length}</span>
                    <span>${Math.round(((voiceState.currentStep + 1) / recipe.inst.length) * 100)}%</span>
                </div>
                <div class="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div class="h-full bg-white transition-all duration-300" 
                        style="width: ${((voiceState.currentStep + 1) / recipe.inst.length) * 100}%"></div>
                </div>
            </div>
            
            <!-- Current Step -->
            <div class="bg-white/10 rounded-xl p-4 mb-3" id="currentStepText">
                <p class="text-lg">${recipe.inst[voiceState.currentStep]}</p>
            </div>
            
            <!-- Controls -->
            <div class="flex justify-center gap-4">
                <button onclick="previousStep()" class="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors" ${voiceState.currentStep === 0 ? 'disabled opacity-50' : ''}>
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                </button>
                
                <button onclick="toggleVoice()" class="w-16 h-16 bg-white text-purple-600 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform" id="playPauseBtn">
                    ${voiceState.isPlaying 
                        ? '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>'
                        : '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>'
                    }
                </button>
                
                <button onclick="repeatStep()" class="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors" title="חזור על השלב">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                </button>
                
                <button onclick="nextStep()" class="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors" ${voiceState.currentStep >= voiceState.recipe.inst.length - 1 ? 'disabled opacity-50' : ''}>
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </button>
            </div>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', voiceUI);
}

function updateVoiceInterface() {
    const stepText = document.getElementById('currentStepText');
    if (stepText && voiceState.recipe) {
        stepText.innerHTML = `<p class="text-lg">${voiceState.recipe.inst[voiceState.currentStep]}</p>`;
    }
    
    // עדכון progress bar
    const voiceInterface = document.getElementById('voiceInterface');
    if (voiceInterface) {
        voiceInterface.outerHTML = '';
        showVoiceInterface();
    }
}

function speakStep(stepIndex) {
    if (!voiceState.recipe || stepIndex >= voiceState.recipe.inst.length) return;
    
    window.speechSynthesis.cancel();
    
    const text = `שלב ${stepIndex + 1}: ${voiceState.recipe.inst[stepIndex]}`;
    voiceState.utterance = new SpeechSynthesisUtterance(text);
    voiceState.utterance.lang = 'he-IL';
    voiceState.utterance.rate = 0.9;
    voiceState.utterance.pitch = 1;
    
    voiceState.utterance.onend = () => {
        // אם זה לא השלב האחרון, המתן 2 שניות ועבור לשלב הבא
        if (voiceState.currentStep < voiceState.recipe.inst.length - 1 && voiceState.isPlaying) {
            setTimeout(() => {
                if (voiceState.isPlaying) {
                    nextStep();
                }
            }, 2000);
        } else if (voiceState.currentStep >= voiceState.recipe.inst.length - 1) {
            // סיום
            const finishUtterance = new SpeechSynthesisUtterance('סיימנו! בתיאבון!');
            finishUtterance.lang = 'he-IL';
            window.speechSynthesis.speak(finishUtterance);
            showToast('🎉 סיימנו! בתיאבון!');
        }
    };
    
    window.speechSynthesis.speak(voiceState.utterance);
}

function toggleVoice() {
    if (voiceState.isPlaying) {
        window.speechSynthesis.pause();
        voiceState.isPlaying = false;
    } else {
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
        } else {
            speakStep(voiceState.currentStep);
        }
        voiceState.isPlaying = true;
    }
    updateVoiceInterface();
}

function nextStep() {
    if (voiceState.currentStep < voiceState.recipe.inst.length - 1) {
        voiceState.currentStep++;
        updateVoiceInterface();
        speakStep(voiceState.currentStep);
    }
}

function previousStep() {
    if (voiceState.currentStep > 0) {
        voiceState.currentStep--;
        updateVoiceInterface();
        speakStep(voiceState.currentStep);
    }
}

function repeatStep() {
    speakStep(voiceState.currentStep);
}

function stopVoiceCooking() {
    window.speechSynthesis.cancel();
    voiceState.isPlaying = false;
    voiceState.currentStep = 0;
    voiceState.recipe = null;
    
    const voiceInterface = document.getElementById('voiceInterface');
    if (voiceInterface) voiceInterface.remove();
}


// ============================================
// 3. "בישלתי את זה!" - גלריה קהילתית
// ============================================

// מאגר תמונות קהילתיות (localStorage based)
let communityPhotos = JSON.parse(localStorage.getItem('communityPhotos') || '[]');

function saveCommunityPhotos() {
    localStorage.setItem('communityPhotos', JSON.stringify(communityPhotos));
}

// פונקציה להעלאת תמונה
function uploadCommunityPhoto(recipeId) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        // המרה ל-base64 (בפרודקשן היינו שולחים לשרת)
        const reader = new FileReader();
        reader.onload = (event) => {
            const photo = {
                id: Date.now(),
                recipeId: recipeId,
                image: event.target.result,
                date: new Date().toISOString(),
                userName: prompt('מה שמך?') || 'אורח',
                likes: 0
            };
            
            communityPhotos.push(photo);
            saveCommunityPhotos();
            showToast('התמונה הועלתה בהצלחה! 📸');
            
            // רענון התצוגה
            if (state.modal) {
                render();
            }
        };
        reader.readAsDataURL(file);
    };
    
    input.click();
}

function likePhoto(photoId) {
    const photo = communityPhotos.find(p => p.id === photoId);
    if (photo) {
        photo.likes++;
        saveCommunityPhotos();
        render();
    }
}

function deletePhoto(photoId) {
    if (confirm('למחוק את התמונה?')) {
        communityPhotos = communityPhotos.filter(p => p.id !== photoId);
        saveCommunityPhotos();
        render();
    }
}

// רנדור הגלריה הקהילתית
function renderCommunityGallery(recipeId) {
    const photos = communityPhotos.filter(p => p.recipeId === recipeId);
    
    return `
    <div class="mt-6 pt-6 border-t border-gray-200">
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-gray-800 flex items-center gap-2">
                <span>📸</span>
                בישלתי את זה! (${photos.length})
            </h3>
            <button onclick="uploadCommunityPhoto(${recipeId})" 
                class="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105">
                + העלו תמונה
            </button>
        </div>
        
        ${photos.length > 0 ? `
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            ${photos.map(photo => `
                <div class="relative group rounded-xl overflow-hidden bg-gray-100 aspect-square">
                    <img src="${photo.image}" alt="תמונה מהקהילה" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div class="absolute bottom-2 left-2 right-2 flex justify-between items-end">
                            <div>
                                <p class="text-white text-sm font-medium">${photo.userName}</p>
                                <p class="text-white/70 text-xs">${new Date(photo.date).toLocaleDateString('he-IL')}</p>
                            </div>
                            <button onclick="event.stopPropagation();likePhoto(${photo.id})" 
                                class="flex items-center gap-1 px-2 py-1 bg-white/20 rounded-full text-white text-sm hover:bg-white/30 transition-colors">
                                ❤️ ${photo.likes}
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        ` : `
        <div class="text-center py-8 bg-gray-50 rounded-xl">
            <span class="text-4xl">📷</span>
            <p class="text-gray-500 mt-2">היו הראשונים לשתף תמונה!</p>
            <button onclick="uploadCommunityPhoto(${recipeId})" 
                class="mt-3 px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-medium hover:bg-pink-200 transition-colors">
                העלו עכשיו
            </button>
        </div>
        `}
    </div>
    `;
}


// ============================================
// ייצוא הפונקציות לשימוש גלובלי
// ============================================

// פונקציה לפתיחת Modal של גלריה קהילתית
function openGalleryModal(recipeId) {
    const recipe = typeof recipes !== 'undefined' ? recipes.find(r => r.id === recipeId) : null;
    const recipeName = recipe ? recipe.title : 'מתכון';
    const photos = communityPhotos.filter(p => p.recipeId === recipeId);

    const modal = document.createElement('div');
    modal.id = 'galleryModal';
    modal.className = 'fixed inset-0 z-[60] flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" onclick="closeGalleryModal()"></div>
        <div class="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden">
            <div class="bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-white">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <span class="text-3xl">📸</span>
                        <div>
                            <h2 class="text-xl font-bold">בישלתי את זה!</h2>
                            <p class="text-white/80 text-sm">${recipeName}</p>
                        </div>
                    </div>
                    <button onclick="closeGalleryModal()" class="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
            </div>

            <div class="p-6 overflow-y-auto max-h-[60vh]">
                <div class="flex justify-center mb-6">
                    <button onclick="uploadCommunityPhoto(${recipeId})"
                        class="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2">
                        <span>📷</span>
                        העלו תמונה שלכם
                    </button>
                </div>

                <div id="galleryPhotosContainer">
                    ${photos.length > 0 ? `
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                        ${photos.map(photo => `
                            <div class="relative group rounded-xl overflow-hidden bg-gray-100 aspect-square shadow-md">
                                <img src="${photo.image}" alt="תמונה מהקהילה" class="w-full h-full object-cover">
                                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div class="absolute bottom-2 left-2 right-2 flex justify-between items-end">
                                        <div>
                                            <p class="text-white text-sm font-medium">${photo.userName}</p>
                                            <p class="text-white/70 text-xs">${new Date(photo.date).toLocaleDateString('he-IL')}</p>
                                        </div>
                                        <button onclick="event.stopPropagation();likePhoto(${photo.id})"
                                            class="flex items-center gap-1 px-2 py-1 bg-white/20 rounded-full text-white text-sm hover:bg-white/30 transition-colors">
                                            ❤️ ${photo.likes}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    ` : `
                    <div class="text-center py-12 bg-gray-50 rounded-xl">
                        <span class="text-6xl">📷</span>
                        <p class="text-gray-600 mt-4 text-lg">עדיין אין תמונות למתכון הזה</p>
                        <p class="text-gray-400 mt-1">היו הראשונים לשתף!</p>
                    </div>
                    `}
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function closeGalleryModal() {
    const modal = document.getElementById('galleryModal');
    if (modal) modal.remove();
}

window.openFridgeModal = openFridgeModal;
window.closeFridgeModal = closeFridgeModal;
window.toggleIngredient = toggleIngredient;
window.removeIngredient = removeIngredient;
window.clearAllIngredients = clearAllIngredients;
window.filterIngredients = filterIngredients;

window.startVoiceCooking = startVoiceCooking;
window.stopVoiceCooking = stopVoiceCooking;
window.toggleVoice = toggleVoice;
window.nextStep = nextStep;
window.previousStep = previousStep;
window.repeatStep = repeatStep;

window.uploadCommunityPhoto = uploadCommunityPhoto;
window.likePhoto = likePhoto;
window.deletePhoto = deletePhoto;
window.renderCommunityGallery = renderCommunityGallery;
window.openGalleryModal = openGalleryModal;
window.closeGalleryModal = closeGalleryModal;
