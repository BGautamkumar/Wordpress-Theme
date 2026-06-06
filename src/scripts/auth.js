// Simple mock authentication system using localStorage
const SESSION_KEY = 'aspire_user_session';

export const authState = {
  user: null,
  isAuthenticated: false,
};

// Initialize auth state on load
export const initAuth = () => {
  const sessionData = localStorage.getItem(SESSION_KEY);
  if (sessionData) {
    try {
      authState.user = JSON.parse(sessionData);
      authState.isAuthenticated = true;
    } catch (e) {
      console.error('Failed to parse session data');
      localStorage.removeItem(SESSION_KEY);
    }
  }
  updateNavbarUI();
};

// Mock Login function
export const login = async (email, password) => {
  // Simulate network delay for premium feel
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password.length >= 6) {
        const user = {
          id: 'usr_' + Math.random().toString(36).substr(2, 9),
          email,
          name: email.split('@')[0],
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(user));
        authState.user = user;
        authState.isAuthenticated = true;
        updateNavbarUI();
        resolve(user);
      } else {
        reject(new Error('Invalid credentials. Password must be at least 6 characters.'));
      }
    }, 1200); // 1.2s delay for loading animation
  });
};

// Mock Logout
export const logout = () => {
  localStorage.removeItem(SESSION_KEY);
  authState.user = null;
  authState.isAuthenticated = false;
  updateNavbarUI();
  
  // Optionally redirect to home if on a protected page
  if (window.location.pathname.includes('/pages/profile')) {
    window.location.href = '/';
  }
};

// Update Navbar based on Auth State
export const updateNavbarUI = () => {
  const authContainer = document.getElementById('auth-container');
  const mobileAuthContainer = document.getElementById('mobile-auth-container');
  
  if (!authContainer) return;

  if (authState.isAuthenticated) {
    // Logged In UI (Desktop)
    authContainer.innerHTML = `
      <div class="relative py-2 js-dropdown-container">
        <button data-dropdown-toggle="profile-menu" aria-expanded="false" class="flex items-center space-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full">
          <img src="${authState.user.avatar}" alt="Profile" class="w-8 h-8 rounded-full border border-borderDim bg-surface">
          <span class="text-sm font-medium text-textMain hidden md:block">${authState.user.name}</span>
          <svg class="w-4 h-4 text-textMuted transition-transform duration-300 dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        <div id="profile-menu" class="absolute top-full right-0 mt-4 w-48 bg-surface/95 backdrop-blur-xl border border-borderDim rounded-xl py-2 opacity-0 invisible translate-y-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 z-50">
          <div class="px-4 py-2 border-b border-borderDim mb-2">
            <p class="text-sm font-medium text-textMain truncate">${authState.user.name}</p>
            <p class="text-xs text-textMuted truncate">${authState.user.email}</p>
          </div>
          <a href="#" class="block px-4 py-2 text-sm text-textMuted hover:text-textMain hover:bg-white/5 transition-colors">Dashboard</a>
          <a href="#" class="block px-4 py-2 text-sm text-textMuted hover:text-textMain hover:bg-white/5 transition-colors">Settings</a>
          <button id="logout-btn" class="w-full text-left px-4 py-2 text-sm text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-colors mt-2">Log out</button>
        </div>
      </div>
    `;

    // Re-bind dropdown listener for the newly injected profile menu
    // We will dispatch a custom event that main.js listens to, or re-run initDropdowns.
    window.dispatchEvent(new CustomEvent('auth:updated'));

    // Bind logout
    setTimeout(() => {
      const logoutBtn = document.getElementById('logout-btn');
      if (logoutBtn) logoutBtn.addEventListener('click', logout);
    }, 50);

    // Mobile Logged In UI
    if (mobileAuthContainer) {
      mobileAuthContainer.innerHTML = `
        <div class="flex items-center space-x-3 mb-6 p-4 bg-surface rounded-xl border border-borderDim">
          <img src="${authState.user.avatar}" class="w-10 h-10 rounded-full">
          <div>
            <p class="text-textMain font-bold">${authState.user.name}</p>
            <p class="text-textMuted text-sm">${authState.user.email}</p>
          </div>
        </div>
        <button id="mobile-logout-btn" class="w-full btn-secondary text-red-500 hover:text-red-400 hover:border-red-500/30 justify-center">Log out</button>
      `;
      setTimeout(() => {
        const mobLogoutBtn = document.getElementById('mobile-logout-btn');
        if (mobLogoutBtn) mobLogoutBtn.addEventListener('click', logout);
      }, 50);
    }
  } else {
    // Logged Out UI (Desktop)
    authContainer.innerHTML = `
      <a href="/pages/signin.html" class="btn-ghost hidden sm:inline-flex">Sign In</a>
      <a href="/pages/pricing.html" class="btn-primary hidden sm:flex">
        <span>Get Aspire</span>
      </a>
    `;

    // Mobile Logged Out UI
    if (mobileAuthContainer) {
      mobileAuthContainer.innerHTML = `
        <a href="/pages/pricing.html" class="btn-primary w-full justify-center">Get Aspire Now</a>
        <a href="/pages/signin.html" class="btn-ghost w-full justify-center mt-3 border border-borderDim">Sign In</a>
      `;
    }
  }
};
