// Hiển thị và ẩn form đăng ký/đăng nhập
function showRegister() {
    document.getElementById('registerForm').classList.add('active');
    showOverlay();
}

function showLogin() {
    document.getElementById('loginForm').classList.add('active');
    showOverlay();
}

function closeModal() {
    document.getElementById('registerForm').classList.remove('active');
    document.getElementById('loginForm').classList.remove('active');
    hideOverlay();
}

// overlay 
function showOverlay() {
    document.querySelector('.overlay').style.display = 'block';
}

function hideOverlay() {
    document.querySelector('.overlay').style.display = 'none';
}

// Hàm đăng ký
function register(event) {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    alert(`Đăng ký thành công! Chào mừng ${username}.`);
    closeModal();
}

// Hàm đăng nhập
function login(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    alert(`Đăng nhập thành công! Chào mừng ${username}.`);
    closeModal();
}

// Tìm kiếm thành phố
function searchCity() {
    const searchValue = document.getElementById('searchCity').value;
    document.getElementById('cityResults').innerHTML = `Tìm kiếm kết quả cho: ${searchValue}`;
}

// forgot pass
function forgotPasswordToggle(event) {
    if (event) event.preventDefault();
    const modal = document.getElementById("forgotPasswordModal");
    if (modal.style.display === "flex") {
        modal.style.display = "none";
    } else {
        modal.style.display = "flex"; 
    }
}

// Hiển thị dịch vụ
function showService() {
    document.getElementById('serviceList').innerHTML = `
        <h3>Dịch vụ của thành phố</h3>
        <p>Địa điểm, thông tin dịch vụ, đánh giá, xếp hạng...</p>
    `;
}

// register
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const userName = document.getElementById("userName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const fullName = document.getElementById("fullName").value;

    if (password !== confirmPassword) {
        alert("Mật khẩu và xác nhận mật khẩu không khớp!");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Email không hợp lệ!");
        return;
    }

    if (password.length < 6) {
        alert("Mật khẩu phải có ít nhất 6 ký tự!");
        return;
    }
  
    // Dữ liệu cần gửi đến API
    const userData = {
        username: userName,
        email: email,
        password: password,
        fullName: fullName
    };

    fetch('http://localhost:8080/api/account/register', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData) 
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Đăng ký thành công!");
            closeForms(); 
        } 
    })
    .catch(error => {
        console.error('Lỗi khi gọi API:', error);
        alert("Có lỗi xảy ra khi gửi yêu cầu!");
    });
  });
  
  function closeForms() {
    // Hàm để đóng modal
    document.querySelector('.sign-up-form').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
  }
  
  function signupToggle() {
    // Hàm để mở/đóng modal
    const form = document.querySelector('.sign-up-form');
    const overlay = document.querySelector('.overlay');
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block';
        overlay.style.display = 'block';
    } else {
        form.style.display = 'none';
        overlay.style.display = 'none';
    }
  }
})

// login
document.addEventListener('DOMContentLoaded', () => { 
    document.getElementById('loginForm').addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission
    
        const username = document.getElementById('loginUserName').value;
        const password = document.getElementById('loginPassword').value;
    
        try {
            const response = await fetch('http://localhost:8080/api/account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }); 
    
            if (response.ok) {  
                const result = await response.json();
                alert('Login successful!');
                closeModal(); // Close the modal
            } else {
                const error = await response.json();
                alert(`Login failed: ${error.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during login.');
        }
    });
})

// log out
let isLoggedIn = false;  // Track login state

// Function to handle login
function handleLogin(event) {
    event.preventDefault();  // Prevent default form submission

    const username = document.getElementById('loginUserName').value;
    const password = document.getElementById('loginPassword').value;

    // Simple validation for empty fields (can be extended for more checks)
    if (username && password) {
        isLoggedIn = true;  // Set login state to true
        updateLoginButton();  // Update the button text to "Log out"
        closeLoginForm();  // Hide the login form
        alert('You are now logged in');  // Optionally alert user
    } else {
        alert('Please enter valid credentials');
    }
}

// Function to toggle the login form visibility
function loginToggle() {
    const loginForm = document.getElementById('loginFormContainer');
    const overlay = document.querySelector('.overlay');
    
    // Check if login form is currently visible
    if (loginForm.classList.contains('active')) {
        // If the form is already active, hide it
        loginForm.classList.remove('active');
        overlay.style.display = 'none';  // Hide overlay
    } else {
        // If the form is not active, show it
        loginForm.classList.add('active');
        overlay.style.display = 'block';  // Show overlay
    }
}

// Function to close the login form
function closeLoginForm() {
    const loginForm = document.getElementById('loginFormContainer');
    const overlay = document.querySelector('.overlay');
    loginForm.classList.remove('active');  // Remove active class to hide the form
    overlay.style.display = 'none';  // Hide overlay
}

// Function to reset login form state
function resetLoginForm() {
    document.getElementById('loginUserName').value = '';  // Clear username input
    document.getElementById('loginPassword').value = '';  // Clear password input
}

// Function to toggle between "Sign in" and "Log out" buttons
function updateLoginButton() {
    const signInBtn = document.getElementById('signInBtn');
    if (isLoggedIn) {
        signInBtn.textContent = 'Log out';
        signInBtn.onclick = logout;  // Change the onclick to logout function
    } else {
        signInBtn.textContent = 'Sign in';
        signInBtn.onclick = loginToggle;  // Reset back to login
    }
}

// Logout function
function logout() {
    isLoggedIn = false;  // Set login state to false
    updateLoginButton();  // Update the button text back to "Sign in"
    resetLoginForm();  // Reset the form to its initial empty state
    closeLoginForm();  // Hide login form and overlay after logout
    alert('You have been logged out');
}

// Function to toggle between login and signup forms
function toggleLogin() {
    if (isLoggedIn) {
        logout();  // If already logged in, log out
    } else {
        loginToggle();  // Show the login form if user is not logged in
    }
}
