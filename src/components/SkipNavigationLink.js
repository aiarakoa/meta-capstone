import './SkipNavigationLink.css';

function SkipNavigationLink() {
  return (
    <>
      <a className = "nav-skipper" href = "#main">
        <p>Click to skip to main content,</p>
        <p>tab to go to navigation</p>
      </a>
    </>
  );
}

export default SkipNavigationLink;