# Debug Instructions for Onboarding Issue

## Steps to Debug:

1. **Open Browser DevTools**
   - Press F12 or right-click → Inspect
   - Go to the "Console" tab

2. **Clear localStorage and refresh**
   ```javascript
   localStorage.clear()
   location.reload()
   ```

3. **Fill out the onboarding form:**
   - Step 1: Enter age, height, weight → Click Continue
   - Step 2: Select a goal → Click Continue  
   - Step 3: Select equipment → Click Continue
   - Step 4: Click on "30 min" button → Click "Start Training!"

4. **Check the console for logs:**
   - You should see: "Start Training clicked!" with your profile data
   - If validation passes: "Validation passed, completing onboarding..."
   - If validation fails: "Validation failed:" with missing fields

5. **What to look for:**
   - Does clicking the button show ANY console log?
   - If yes, does it say "Validation passed" or "Validation failed"?
   - If validation failed, which fields are missing/undefined?

## Common Issues:

- **Button doesn't respond at all**: Check if there are any JavaScript errors in console
- **Validation fails**: Make sure you clicked the quick-select buttons (15/30/45/60 min) instead of just typing
- **Onboarding doesn't close**: Check if `hasCompletedOnboarding` is being set in localStorage

## Manual Fix (if needed):

If nothing works, you can manually complete onboarding via console:
```javascript
localStorage.setItem('fittrack-storage', JSON.stringify({
  state: {
    hasCompletedOnboarding: true,
    userProfile: {
      age: 25,
      height: 175,
      weight: 70,
      goal: 'stay_fit',
      equipment: 'home',
      timeAvailable: 30,
      level: 'beginner'
    }
  },
  version: 0
}))
location.reload()
```
