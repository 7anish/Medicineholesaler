import React from 'react'
import img from '../assets/Hero2.png'
import Swal from 'sweetalert2'
import emailjs from '@emailjs/browser'

const Contact = () => {

    const handlesubmit = (e)=>{
        e.preventDefault()
        console.log(e.target.name.value)
        console.log(e.target.email.value)
        console.log(e.target.phno.value)
        console.log(e.target.textarea.value)

        const detail = {
            name : e.target.name.value,
            phno : e.target.phno.value,
            email : e.target.email.value,
            message : e.target.textarea.value,
        }


        emailjs.send('service_dw2un2c', 'template_3ehp3ac', detail ,"TuVP-Gmb8J1eRd7X3").then(
            (response) => {
                Swal.fire({
                    title : "Message Send Sucessfully",
                    icon : "success"
                })
            },
            (error) => {
                Swal.fire({
                    title : "Try After Some Time",
                    icon : "error"
                })
            },
        );
    }
    return (
        <section class="" id="contact">
            <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                <div class="mb-4">
                    <div class="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
                        <p class="text-base font-semibold uppercase tracking-wide text-green-600 ">
                            Contact
                        </p>
                        <h2
                            class="font-heading mb-4 font-bold tracking-tight text-gray-900 text-3xl sm:text-4xl">
                            Tell us what you need
                        </h2>
                    </div>
                </div>
                <div class="flex items-stretch justify-between">
                        <div class="md:w-[45%] w-full" id="form">
                            <form id="contactForm" onSubmit={(e)=> handlesubmit(e)}>
                                <div class="mb-6">
                                    <div class="mx-0 mb-1 sm:mb-4">
                                        <div class="mx-0 mb-1 sm:mb-4">
                                            <label for="name" class="pb-1 text-xs uppercase tracking-wider"></label><input type="text" id="name"  placeholder="Your name" class="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md  sm:mb-0" name="name" />
                                        </div>
                                        <div class="mx-0 mb-1 sm:mb-4">
                                            <label for="email" class="pb-1 text-xs uppercase tracking-wider"></label><input type="email" id="email"  placeholder="Your email address" class="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md  sm:mb-0" name="email" />
                                        </div>
                                        <div class="mx-0 mb-1 sm:mb-4">
                                            <label for="phno" class="pb-1 text-xs uppercase tracking-wider"></label><input type="tel" id="phno"  placeholder="Your Phone Number " class="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md  sm:mb-0" name="phno" />
                                        </div>
                                    </div>
                                    <div class="mx-0 mb-1 sm:mb-4">
                                        <label for="textarea" class="pb-1 text-xs uppercase tracking-wider"></label><textarea id="textarea" name="textarea" cols="30" rows="5" placeholder="Tell Us What Do you Want....." class="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md  sm:mb-0"></textarea>
                                    </div>
                                </div>
                                <div class="text-center">
                                    <button type="submit" class="w-full bg-green-600 text-white px-6 py-3 font-xl rounded-md sm:mb-0">Send Message</button>
                                </div>
                            </form>
                        </div>
                        <div className='w-[45%] md:flex hidden items-center justify-center'>
                            <img src={img} alt="" className='scale-90' />
                        </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
