import ScrollToTop from '../ScrollToTop'

export default function ScrollToTopExample() {
  // Add some height to demonstrate scroll functionality
  return (
    <div>
      <div style={{ height: '150vh', padding: '20px' }}>
        <p>Scroll down to see the scroll-to-top button appear...</p>
        <div style={{ marginTop: '100vh' }}>
          <p>The scroll-to-top button should now be visible in the bottom right corner!</p>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
}