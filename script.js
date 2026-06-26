// ========================================
// LOGIN SYSTEM
// ========================================

const CORRECT_PASSWORD = 'mongu2026';

function checkLogin() {
    const loggedIn = sessionStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
        showMainApp();
    } else {
        showLoginPage();
    }
}

function showLoginPage() {
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('mainApp').style.display = 'none';
}

function showMainApp() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('mainApp').style.display = 'block';
    // Load data after login
    setTimeout(() => {
        if (typeof loadHistoryFromDatabase === 'function') {
            loadHistoryFromDatabase();
            updateBadge();
            updateAnalytics();
        }
    }, 100);
}

// Login button handler
document.getElementById('loginBtn').addEventListener('click', function() {
    const password = document.getElementById('loginPassword').value.trim();
    const errorEl = document.getElementById('loginError');

    if (password === CORRECT_PASSWORD) {
        sessionStorage.setItem('loggedIn', 'true');
        errorEl.style.display = 'none';
        showMainApp();
    } else {
        errorEl.style.display = 'block';
        document.getElementById('loginPassword').value = '';
        document.getElementById('loginPassword').focus();
    }
});

// Enter key on password field
document.getElementById('loginPassword').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('loginBtn').click();
    }
});

// Logout button handler
document.getElementById('logoutBtn').addEventListener('click', function() {
    sessionStorage.removeItem('loggedIn');
    showLoginPage();
    document.getElementById('loginPassword').value = '';
    document.getElementById('loginError').style.display = 'none';
});

// ========================================
// SUPABASE DATABASE CONFIGURATION
// ========================================

// ⚠️ REPLACE THESE WITH YOUR SUPABASE CREDENTIALS
const SUPABASE_URL = 'https://vsxsmosfcfgziubqulkg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzeHNtb3NmY2Zneml1YnF1bGtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0MDk3OTUsImV4cCI6MjA5Nzk4NTc5NX0.eTEaOE2HYzyMSYX2rQ8aQ-S1F6PNZgwLdJVBSTEbC8w';

// Initialize Supabase client
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ... (rest of your existing script.js code below)

// ========================================
// INIT - Check login status first
// ========================================

// Override the window load event to check login first
window.addEventListener('load', function() {
    checkLogin();
});