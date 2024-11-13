import React from 'react'


function Footer() {
  return (
    <footer className='bg-gray-800 mt-14'>
        <div className='p-12 flex flex-wrap justify-around'>
            <div className=' column '>
                <h4>Comany</h4>
                <div className="row">
                    <ul className='mt-3 '>
                        <li>About us</li>
                        <li>Our Services</li>
                        <li>Privacy Policy</li>
                        <li>contact us</li>
                    </ul>
                </div>
            </div>
            <div className='column'>
                <h4>Get Help</h4>
                <div className="row">
                    <ul>
                        <li>FAQ</li>
                        <li>Contact us</li>
                        <li>All Posts</li>
                    </ul>
                </div>
            </div>
            <div className=' column'>
                <h4>Follow US</h4>
                <div className="row-icons">
                        <i className="fa-brands fa-instagram"></i>
                        <i class="fa-brands fa-facebook"></i>
                        <i class="fa-brands fa-github"></i>
                        <i class="fa-brands fa-x-twitter"></i>
                    
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer