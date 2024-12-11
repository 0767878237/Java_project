// Hiển thị và ẩn form đăng ký/đăng nhập
function showRegister() {
    document.getElementById('registerForm').style.display = 'block';
}

function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
}

function closeModal() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'none';
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
        modal.style.display = "none"; // Ẩn modal
    } else {
        modal.style.display = "flex"; // Hiển thị modal
    }
}


// Hiển thị dịch vụ
function showService() {
    document.getElementById('serviceList').innerHTML = `
        <h3>Dịch vụ của thành phố</h3>
        <p>Địa điểm, thông tin dịch vụ, đánh giá, xếp hạng...</p>
    `;
}

// api
var web_API = 'http://localhost:8080/v3/api-docs';

// register
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('.sign-up-form form');
    const registerButton = document.getElementById('registerSubmit');

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (!firstName || !lastName || !email || !password || !confirmPassword) {
                alert('Please fill in all fields');
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            const userData = {
                firstName,
                lastName,
                email,
                password,
            };

            fetch(web_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Register failed: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    alert('Registration successful');
                    console.log(data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('Error during registration');
                });
        });
    }
});

// login 
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form form');
    const loginButton = document.getElementById('loginSubmit');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }

            const loginData = { email, password };

            fetch(web_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Login failed: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    alert('Login successful');
                    console.log(data);

                    localStorage.setItem('jwt', data.token);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('Error during login');
                });
        });
    }
});
