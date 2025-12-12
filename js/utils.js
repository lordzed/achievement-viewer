// Get GitHub username from repository URL
export async function getGitHubUserInfo() {
    const currentUrl = window.location.href;
    let githubUsername = 'User';
    let githubAvatarUrl = 'https://avatars.fastly.steamstatic.com/29283662f3b58488c74ad750539ba5289b53cf6c_full.jpg';
    
    const repoMatch = currentUrl.match(/github\.io\/([^\/]+)/);
    if (repoMatch) {
        githubUsername = currentUrl.split('.github.io')[0].split('//')[1];
        githubUsername = githubUsername.charAt(0).toUpperCase() + githubUsername.slice(1);
        
        try {
            const lowerUsername = githubUsername.toLowerCase();
            const avatarResponse = await fetch(`https://api.github.com/users/${lowerUsername}`);
            if (avatarResponse.ok) {
                const userData = await avatarResponse.json();
                githubAvatarUrl = userData.avatar_url;
            }
        } catch (error) {
            console.log('Could not fetch GitHub avatar');
        }
    }
    
    return { username: githubUsername, avatarUrl: githubAvatarUrl };
}

// Percentage calculation
export function calculatePercentage(unlocked, total) {
    return total > 0 ? Math.round((unlocked / total) * 100) : 0;
}

// Date formatting
export function formatUnlockDate(timestamp) {
    return new Date(timestamp * 1000).toLocaleDateString();
}