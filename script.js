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
    
    // 제품 설명 더보기/접기 기능
    // 제품 설명을 펼치거나 접는 함수
    function toggleDescription(productNumber) {
        // 해당 제품의 전체 설명 요소 찾기
        const productFull = document.getElementById('product-full-' + productNumber);
        
        // 해당 제품의 더보기 버튼 찾기
        const moreBtn = productFull.previousElementSibling;
        
        // 현재 전체 설명이 보이는지 확인
        const isVisible = productFull.style.display !== 'none';
        
        if (isVisible) {
            // 전체 설명이 보이면 숨기기
            productFull.style.display = 'none';
            // 버튼 텍스트를 '더보기'로 변경
            moreBtn.textContent = '더보기';
            // 콘솔에 메시지 출력
            console.log('제품 ' + productNumber + ' 설명을 접었습니다.');
        } else {
            // 전체 설명이 숨겨져 있으면 보이기
            productFull.style.display = 'block';
            // 버튼 텍스트를 '접기'로 변경
            moreBtn.textContent = '접기';
            // 콘솔에 메시지 출력
            console.log('제품 ' + productNumber + ' 설명을 펼쳤습니다.');
        }
    }
    
    // 전역 함수로 만들어서 HTML에서 onclick으로 사용할 수 있게 하기
    window.toggleDescription = toggleDescription;
    
    // CEO 인사말 더보기/닫기 기능
    // CEO 인사말을 펼치거나 접는 함수
    function toggleCeoMessage() {
        // CEO 요약 인사말 요소 찾기
        const ceoSummary = document.querySelector('.ceo-summary');
        
        // CEO 전체 인사말 요소 찾기
        const ceoFull = document.getElementById('ceo-full-message');
        
        // CEO 더보기 버튼 찾기
        const moreBtn = document.querySelector('.ceo-more-btn');
        
        // CEO 닫기 버튼 찾기
        const closeBtn = document.getElementById('ceo-close-btn');
        
        // 현재 전체 인사말이 보이는지 확인
        const isFullVisible = ceoFull.style.display !== 'none';
        
        if (isFullVisible) {
            // 전체 인사말이 보이면 요약으로 변경
            ceoSummary.style.display = 'block';
            ceoFull.style.display = 'none';
            moreBtn.style.display = 'inline-block';
            closeBtn.style.display = 'none';
            // 콘솔에 메시지 출력
            console.log('CEO 인사말을 요약으로 접었습니다.');
        } else {
            // 요약이 보이면 전체 인사말로 변경
            ceoSummary.style.display = 'none';
            ceoFull.style.display = 'block';
            moreBtn.style.display = 'none';
            closeBtn.style.display = 'inline-block';
            // 콘솔에 메시지 출력
            console.log('CEO 인사말을 전체로 펼쳤습니다.');
        }
    }
    
    // 전역 함수로 만들어서 HTML에서 onclick으로 사용할 수 있게 하기
    window.toggleCeoMessage = toggleCeoMessage;
    
    // Q&A 섹션 질문 제출 기능
    // 질문 제출 폼을 처리하는 함수
    function submitQuestion(event) {
        // 폼 기본 제출 동작 막기
        event.preventDefault();
        
        // 질문 제목과 내용 입력 필드 찾기
        const questionTitle = document.getElementById('question-title');
        const questionContent = document.getElementById('question-content');
        
        // 질문 완료 메시지 요소 찾기
        const successMessage = document.getElementById('question-success');
        
        // 입력된 제목과 내용 가져오기
        const titleValue = questionTitle.value.trim();
        const contentValue = questionContent.value.trim();
        
        // 입력 내용 확인
        if (titleValue === '' || contentValue === '') {
            // 입력이 비어있으면 경고 메시지 표시
            alert('질문 제목과 내용을 모두 입력해주세요.');
            return;
        }
        
        // 콘솔에 질문 내용 출력 (개발자 도구에서 확인 가능)
        console.log('질문이 제출되었습니다:');
        console.log('제목: ' + titleValue);
        console.log('내용: ' + contentValue);
        
        // 입력 필드 초기화
        questionTitle.value = '';
        questionContent.value = '';
        
        // 성공 메시지 표시
        successMessage.style.display = 'block';
        
        // 3초 후에 성공 메시지 숨기기
        setTimeout(function() {
            successMessage.style.display = 'none';
        }, 3000);
        
        // 콘솔에 완료 메시지 출력
        console.log('질문 제출이 완료되었습니다. 이메일로 답변을 보내드릴 예정입니다.');
    }
    
    // 전역 함수로 만들어서 HTML에서 onsubmit으로 사용할 수 있게 하기
    window.submitQuestion = submitQuestion;
    
    // 콘솔에 초기화 완료 메시지 출력
    console.log('중간계AI 스튜디오 헤더가 성공적으로 로드되었습니다!');
    console.log('히어로 캐러셀이 성공적으로 초기화되었습니다!');
    console.log('총 ' + totalSlides + '개의 슬라이드가 준비되었습니다.');
    console.log('제품 섹션 더보기/접기 기능이 준비되었습니다!');
    console.log('고객 후기 섹션이 성공적으로 로드되었습니다!');
    console.log('총 6개의 고객 후기가 준비되었습니다.');
    console.log('CEO 인사말 섹션이 성공적으로 로드되었습니다!');
    console.log('CEO 인사말 더보기/닫기 기능이 준비되었습니다!');
    console.log('Q&A 섹션이 성공적으로 로드되었습니다!');
    console.log('Q&A 질문 제출 기능이 준비되었습니다!');
    console.log('푸터 섹션이 성공적으로 로드되었습니다!');
    console.log('모든 섹션이 성공적으로 초기화되었습니다!');
}); 