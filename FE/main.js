// Hiển thị và ẩn form đăng ký/đăng nhập
function showRegister() {
    // document.getElementById('registerForm').style.display = 'block';
    document.getElementById('registerForm').classList.add('active');
    showOverlay();
}

function showLogin() {
    // document.getElementById('loginForm').style.display = 'block';
    document.getElementById('loginForm').classList.add('active');
    showOverlay();
}

function showMyAccount() {
    const accountModal = document.querySelector('.my_account');
    accountModal.classList.toggle('active');
    if (accountModal.classList.contains('active')) {
        fetchAndDisplayAccountData();
    }
}

function closeModal() {
    // document.getElementById('registerForm').style.display = 'none';
    // document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').classList.remove('active');
    document.getElementById('loginForm').classList.remove('active');
    hideOverlay();
}

function closeLoginForm() {
    const loginForm = document.getElementById('loginFormContainer');
    const overlay = document.querySelector('.overlay');
    loginForm.classList.remove('active');  // Remove active class to hide the form
    overlay.style.display = 'none';  // Hide overlay
}

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
    event.preventDefault();  // Ngừng gửi form mặc định để xử lý theo cách riêng
  
    // Lấy giá trị từ các trường nhập liệu
    const userName = document.getElementById("userName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const fullName = document.getElementById("fullName").value;
  
    // Kiểm tra nếu mật khẩu và xác nhận mật khẩu giống nhau
    if (password !== confirmPassword) {
        alert("Mật khẩu và xác nhận mật khẩu không khớp!");
        return;
    }
  
    // Kiểm tra tính hợp lệ của email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Email không hợp lệ!");
        return;
    }
  
    // Kiểm tra mật khẩu phải có ít nhất 6 ký tự
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
  
    // Gọi API để đăng ký người dùng
    fetch('http://localhost:8080/api/account/register', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)  // Chuyển đổi dữ liệu thành chuỗi JSON
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Đăng ký thành công!");
            // Sau khi đăng ký thành công, bạn có thể đóng form, hoặc chuyển hướng người dùng
            closeForms(); // Đóng modal đăng ký
        }
    })
    .catch(error => {
        console.error('Lỗi khi gọi API:', error);
        alert("Có lỗi xảy ra khi gửi yêu cầu!");
    });
  });
  
  function closeForms() {
    document.querySelector('.sign-up-form').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
  }
  
  function signupToggle() {
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

                if (result.token) {
                    localStorage.setItem('authToken', result.token); 
                } else {
                    console.error('No token found in response');
                }
            
                alert('Login successful!');
                closeLoginForm(); // Close the modal
                document.querySelector('.sign-in').style.display = 'none';
                document.querySelector('.join-us').style.display = 'none';
                document.querySelector('.user').style.display = 'flex';
                document.querySelector('.user-name').innerHTML = result.username;
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
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("log-out").addEventListener("click", function (event) { 
        localStorage.clear();
        sessionStorage.clear();
        alert("You have logged out")
    });
})

// get user details
async function fetchAndDisplayAccountData() {
    try {
        const token = localStorage.getItem('authToken'); // Hoặc sessionStorage.getItem('authToken');

        if (!token) {
            alert('You are not authenticated. Please log in.');
            return;
        }
        // Gọi API lấy thông tin tài khoản
        const response = await fetch('http://localhost:8080/api/account', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const accountData = await response.json();

            document.getElementById('accountUserName').value = accountData.username || '';
            document.getElementById('accountRole').value = accountData.role || '';
        } else {
            console.error('Failed to fetch account data:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error fetching account data:', error);
    }
}

// edit user details
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('accountForm').addEventListener('submit', async (event) => {
        event.preventDefault(); // Ngăn form submit mặc định
    
        const token = localStorage.getItem('authToken'); // Lấy token từ localStorage
        const fullName = document.getElementById('accountFullName').value;
        const email = document.getElementById('accountEmail').value;
    
        if (!token) {
            alert('You are not authenticated. Please log in.');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:8080/api/account', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    fullName: fullName,
                    email: email
                })
            });
    
            if (response.ok) {
                const result = await response.json();
                alert('Account updated successfully!');
                // Cập nhật lại giao diện nếu cần
                document.getElementById('accountFullName').value = result.fullName;
                document.getElementById('accountEmail').value = result.email;
                showMyAccount();
            } else {
                const error = await response.json();
                alert(`Update failed: ${error.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error updating account:', error);
            alert('An error occurred while updating your account.');
        }
    });
})
