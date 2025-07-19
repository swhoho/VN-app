/**
 * 이미지 URL을 프록시를 통해 로드하도록 변환하는 유틸리티
 */

/**
 * 외부 이미지 URL을 프록시 URL로 변환
 * @param originalUrl 원본 이미지 URL
 * @returns 프록시를 통한 URL 또는 원본 URL
 */
export function getProxiedImageUrl(originalUrl: string): string {
  if (!originalUrl) return '';
  
  try {
    const url = new URL(originalUrl);
    
    // Google Cloud Storage 도메인인 경우 프록시 사용
    if (url.hostname === 'storage.googleapis.com' || 
        url.hostname === 'storage.cloud.google.com') {
      // 프록시 서버를 통해 이미지 로드
      return `/proxy/${encodeURIComponent(originalUrl)}`;
    }
    
    // 기타 허용된 도메인들도 프록시를 통해 로드
    const allowedDomains = [
      'storage.googleapis.com',
      'storage.cloud.google.com',
      'images.unsplash.com',
      'cdn.pixabay.com',
      'images.pexels.com'
    ];
    
    const isAllowedDomain = allowedDomains.some(domain => 
      url.hostname === domain || url.hostname.endsWith('.' + domain)
    );
    
    if (isAllowedDomain) {
      return `/proxy/${encodeURIComponent(originalUrl)}`;
    }
    
    // 허용되지 않은 도메인은 원본 URL 반환 (차단될 수 있음)
    return originalUrl;
    
  } catch (error) {
    console.warn('Invalid image URL:', originalUrl);
    return originalUrl;
  }
}

/**
 * 이미지 로딩 에러 시 대체 이미지 URL 반환
 */
export function getFallbackImageUrl(): string {
  return '/proxy/' + encodeURIComponent('https://via.placeholder.com/300x400/cccccc/666666?text=Image+Not+Found');
}

/**
 * 이미지 컴포넌트용 props를 생성하는 헬퍼 함수
 */
export function getImageProps(originalUrl: string) {
  return {
    src: getProxiedImageUrl(originalUrl),
    onError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      const target = e.target as HTMLImageElement;
      if (target.src !== getFallbackImageUrl()) {
        target.src = getFallbackImageUrl();
      }
    }
  };
}