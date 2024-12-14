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
        } else {
            alert("Có lỗi xảy ra: " + data.message); // Hiển thị lỗi nếu có
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
