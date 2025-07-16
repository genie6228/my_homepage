// 페이지가 다 로드되면 실행되는 함수
document.addEventListener('DOMContentLoaded', function() {
    
    // 메뉴 항목들을 모두 찾아서 변수에 저장
    const menuItems = document.querySelectorAll('.menu-item');
    
    // 로그인 버튼을 찾아서 변수에 저장
    const loginBtn = document.querySelector('.login-btn');
    
    // 각 메뉴 항목에 클릭 이벤트 추가
    menuItems.forEach(function(item) {
        // 메뉴 항목을 클릭했을 때 실행되는 함수
        item.addEventListener('click', function(e) {
            // 링크 기본 동작 막기
            e.preventDefault();
            
            // 클릭한 메뉴 이름 가져오기
            const menuName = this.textContent;
            
            // 콘솔에 메시지 출력 (개발자 도구에서 확인 가능)
            console.log(menuName + ' 메뉴를 클릭했습니다!');
            
            // 사용자에게 알림 창 보여주기
            alert(menuName + ' 페이지로 이동합니다!');
        });
    });
    
    // 로그인 버튼에 클릭 이벤트 추가
    loginBtn.addEventListener('click', function() {
        // 콘솔에 메시지 출력
        console.log('로그인 버튼을 클릭했습니다!');
        
        // 사용자에게 알림 창 보여주기
        alert('로그인 페이지로 이동합니다!');
    });
    
    // 헤더가 화면 맨 위에 고정되도록 하는 함수
    function makeHeaderSticky() {
        // 헤더 요소 찾기
        const header = document.querySelector('.header');
        
        // 페이지 스크롤 위치 확인
        const scrollPosition = window.scrollY;
        
        // 스크롤 위치가 10px 이상이면 그림자 효과 더하기
        if (scrollPosition > 10) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }
    
    // 페이지 스크롤할 때마다 헤더 스타일 업데이트
    window.addEventListener('scroll', makeHeaderSticky);
    
    // 히어로 캐러셀 기능 시작
    // 현재 활성화된 슬라이드 번호 (0부터 시작)
    let currentSlideIndex = 0;
    
    // 모든 슬라이드 요소들을 찾아서 변수에 저장
    const slides = document.querySelectorAll('.hero-slide');
    
    // 모든 인디케이터 요소들을 찾아서 변수에 저장
    const indicators = document.querySelectorAll('.indicator');
    
    // 전체 슬라이드 개수
    const totalSlides = slides.length;
    
    // 슬라이드를 보여주는 함수
    function showSlide(slideIndex) {
        // 모든 슬라이드에서 active 클래스 제거 (숨기기)
        slides.forEach(function(slide) {
            slide.classList.remove('active');
        });
        
        // 모든 인디케이터에서 active 클래스 제거
        indicators.forEach(function(indicator) {
            indicator.classList.remove('active');
        });
        
        // 선택된 슬라이드에 active 클래스 추가 (보이기)
        slides[slideIndex].classList.add('active');
        
        // 선택된 인디케이터에 active 클래스 추가
        indicators[slideIndex].classList.add('active');
        
        // 현재 슬라이드 번호 업데이트
        currentSlideIndex = slideIndex;
        
        // 콘솔에 현재 슬라이드 정보 출력
        console.log('현재 슬라이드: ' + (slideIndex + 1) + '/' + totalSlides);
    }
    
    // 다음 슬라이드로 이동하는 함수
    function nextSlide() {
        // 다음 슬라이드 번호 계산 (마지막 슬라이드면 첫 번째로)
        const nextIndex = (currentSlideIndex + 1) % totalSlides;
        showSlide(nextIndex);
    }
    
    // 이전 슬라이드로 이동하는 함수
    function previousSlide() {
        // 이전 슬라이드 번호 계산 (첫 번째 슬라이드면 마지막으로)
        const prevIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
        showSlide(prevIndex);
    }
    
    // 특정 슬라이드로 이동하는 함수
    function currentSlide(slideNumber) {
        // 슬라이드 번호를 인덱스로 변환 (1부터 시작하는 번호를 0부터 시작하는 인덱스로)
        const slideIndex = slideNumber - 1;
        showSlide(slideIndex);
    }
    
    // 자동 슬라이드 기능
    // 5초마다 자동으로 다음 슬라이드로 이동
    let autoSlideInterval = setInterval(nextSlide, 5000);
    
    // 마우스가 히어로 섹션에 올라가면 자동 슬라이드 멈추기
    const heroSection = document.querySelector('.hero');
    heroSection.addEventListener('mouseenter', function() {
        clearInterval(autoSlideInterval);
        console.log('자동 슬라이드가 일시 정지되었습니다.');
    });
    
    // 마우스가 히어로 섹션에서 나가면 자동 슬라이드 다시 시작
    heroSection.addEventListener('mouseleave', function() {
        autoSlideInterval = setInterval(nextSlide, 5000);
        console.log('자동 슬라이드가 다시 시작되었습니다.');
    });
    
    // 전역 함수로 만들어서 HTML에서 onclick으로 사용할 수 있게 하기
    window.nextSlide = nextSlide;
    window.previousSlide = previousSlide;
    window.currentSlide = currentSlide;
    
    // 콘솔에 초기화 완료 메시지 출력
    console.log('중간계AI 스튜디오 헤더가 성공적으로 로드되었습니다!');
    console.log('히어로 캐러셀이 성공적으로 초기화되었습니다!');
    console.log('총 ' + totalSlides + '개의 슬라이드가 준비되었습니다.');
}); 