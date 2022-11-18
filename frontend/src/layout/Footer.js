import React from 'react';
import './index.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const [admin, setAdmin] = useState(false)
  const authAdmin = localStorage.getItem('roleId');
  useEffect(() => {
    if (authAdmin === 'admin') setAdmin(true)
  }, [authAdmin]);
  if(admin) {
    return (
      <div className="dashborad-admin">
        <div className="dashborad-admin-m">
          <Link to={'/dash-board'} className="dashborad-admin-l">Welcome to dashboard for Admin</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-bar">
      <div class="text-center text-lg-start bg-white text-muted">
        <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div class="me-5 d-none d-lg-block">
            <span>Kết nối với chúng tôi trên mạng xã hội::</span>
          </div>
          <div>
             <a href="" class="me-4 link-secondary">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="" class="me-4 link-secondary">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="" class="me-4 link-secondary">
              <i class="fab fa-google"></i>
            </a>
            <a href="" class="me-4 link-secondary">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="" class="me-4 link-secondary">
              <i class="fab fa-linkedin"></i>
            </a>
            <a href="" class="me-4 link-secondary">
              <i class="fab fa-github"></i>
            </a> 
          </div>
        </section>
        <section class="">
          <div class="container text-center text-md-start mt-5">
            <div class="row mt-3">
              <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 class="text-uppercase fw-bold mb-4">
                  <i class="fas fa-gem me-3 text-secondary"></i>Coder house
                </h6>
                <p>
                  <img class='img-footer' src='https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/280562833_147789331145312_687931909080083942_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=WrZ60JlS_0cAX-1qQab&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfAT0KSaWfRpmE8ISYno8DX8wbzEYCclaR7oLUBnqqePyg&oe=636105A2' alt='coder-house-img'/>
                </p>
              </div>
              <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 class="text-uppercase fw-bold mb-4">Order ngay</h6>
                <p>
                  <a href="#!" class="text-reset">
                    Cà phê-Bánh mỳ
                  </a>
                </p>
                <p>
                  <a href="#!" class="text-reset">
                    Cà phê-Bánh mỳ
                  </a>
                </p>
                <p>
                  <a href="#!" class="text-reset">
                    Cà phê-Bánh mỳ
                  </a>
                </p>
                <p>
                  <a href="#!" class="text-reset">
                    Cà phê-Bánh mỳ
                  </a>
                </p>
              </div>
              <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 class="text-uppercase fw-bold mb-4">LIÊN KẾT HỮU ÍCH</h6>
                <p>
                  <a href="#!" class="text-reset">
                    Giúp đỡ
                  </a>
                </p>
                <p>
                  <a href="#!" class="text-reset">
                    Cài đặt
                  </a>
                </p>
                <p>
                  <a href="#!" class="text-reset">
                    Phản hồi
                  </a>
                </p>
              </div>
              <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 class="text-uppercase fw-bold mb-4">Liên hệ</h6>
                <p>
                  <i class="fas fa-home me-3 text-secondary"></i>000 Nguyễn Tất Thành, Hải Châu, Đà Nẵng
                </p>
                <p>
                  <i class="fas fa-envelope me-3 text-secondary"></i>
                  info@example.com
                </p>
                <p>
                  <i class="fas fa-phone me-3 text-secondary"></i> + 01 234 567
                  88
                </p>
                <p>
                  <i class="fas fa-print me-3 text-secondary"></i> + 01 234 567
                  89
                </p>
              </div>
            </div>
          </div>
        </section>
        <div
          class="text-center p-4"
        //   style="background-color: rgba(0, 0, 0, 0.025);"
        >
          © 2022 Bản Quyền :
          <a class="text-reset fw-bold" href="https://coderhouse.com/">
            Coderhouse.com
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
