import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Register from './Registration.module.css';

const pattern = /\s/g;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*\d)(?=.*[A-Z])(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

function Home() {
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();

    function checkFirstName() {
        const firstName = document.getElementById("firstName").value;
        const firstNameError = document.getElementById("firstNameError");
        if (firstName.match(pattern)) {
            firstNameError.textContent = "* White Spaces are not allowed in Fist Name";
            return false;
        }
        firstNameError.textContent = "";
        return true;
    }

    function checkLastName() {
        const lastName = document.getElementById("lastName").value;
        const lastNameError = document.getElementById("lastNameError");
        if (lastName.match(pattern)) {
            lastNameError.textContent = "* White Spaces are not allowed in Last Name";
            return false;
        }
        lastNameError.textContent = "";
        return true;
    }

    function checkEmail() {
        const user = document.getElementById("email").value;
        const emailError = document.getElementById("emailError");

        if (user.match(pattern)) {
            emailError.innerHTML = "* White Spaces are not allowed in Email";
            return false;
        }

        if (!user.match(emailPattern)) {
            emailError.innerHTML = "* Invalid Email Format";
            return false;
        }

        emailError.innerHTML = "";
        return true;
    }

    function checkPassword() {
        const pass = document.getElementById("password").value;
        const passwordError = document.getElementById("passwordError");

        if (pass.match(pattern)) {
            passwordError.innerHTML = "* White Spaces are not allowed in Password";
            return false;
        }

        if (!pass.match(passwordPattern)) {
            passwordError.innerHTML = "* Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character";
            return false;
        }

        passwordError.innerHTML = "";
        return true;
    }

    function validatePassword() {
        const pass = document.getElementById("password").value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const confirmError = document.getElementById('confirmError');

        if (pass !== confirmPassword) {
            confirmError.innerHTML = "** Passwords do not match";
            return false;
        }

        confirmError.innerHTML = "";
        return true;
    }

    function togglePassword(inputId) {
        const x = document.getElementById(inputId);
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    function validateDate() {
        const inputDate = new Date(document.getElementById('date').value);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        if (inputDate > currentDate) {
            dateError.innerHTML = "Date of birth cannot be in the future";
            return false;
        }
        return true;
    }

    function autocompleteCity(input) {
        const cities = ["Bangalore", "Chennai", "Coimbatore", "Delhi", "New York", "Busan", "Incheon", "Daegu", "Shanghai", "Shenzhen", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"];

        const container = document.getElementById("autocomplete-container");
        container.innerHTML = '';

        const val = input.value.toLowerCase();
        if (!val) return false;

        cities.forEach(function (city) {
            if (city.toLowerCase().indexOf(val) > -1) {
                const div = document.createElement("div");
                div.textContent = city;
                div.addEventListener("click", function (e) {
                    input.value = this.textContent;
                    container.innerHTML = '';
                });
                container.appendChild(div);
            }
        });

        container.style.display = 'block';
    }

    function states() {
        const countrySelect = document.getElementById("country");
        const stateSelect = document.getElementById("state");
        const country = countrySelect.options[countrySelect.selectedIndex].value;

        stateSelect.innerHTML = "<option value=''>Select State</option>";
        if (country === "India") {
            stateSelect.innerHTML += "<option value='state1'>Karnataka</option>";
            stateSelect.innerHTML += "<option value='state2'>Maharashtra</option>";
            stateSelect.innerHTML += "<option value='state3'>Andhra Pradesh</option>";
        } else if (country === "China") {
            stateSelect.innerHTML += "<option value='state4'>Guangxi</option>";
            stateSelect.innerHTML += "<option value='state5'>Ningxia</option>";
            stateSelect.innerHTML += "<option value='state6'>Hebei</option>";
        } else if (country === "Korea") {
            stateSelect.innerHTML += "<option value='state7'>North Chung cheong</option>";
            stateSelect.innerHTML += "<option value='state8'>SouthChung cheong</option>";
            stateSelect.innerHTML += "<option value='state9'>Gangwon</option>";
        } else if (country === "Japan") {
            stateSelect.innerHTML += "<option value='state10'> Akita</option>";
            stateSelect.innerHTML += "<option value='state11'> Yamagata</option>";
            stateSelect.innerHTML += "<option value='state12'> Fukushima</option>";
        }
    }

    function validateForm(event) {
        event.preventDefault();
        const firstNameValid = checkFirstName();
        const lastNameValid = checkLastName();
        const emailValid = checkEmail();
        const passwordValid = checkPassword();
        const confirmPasswordValid = validatePassword();
        const dateValid = validateDate();
        const cityValid = document.getElementById("city").value.trim() !== "";
        const stateValid = document.getElementById("state").value.trim() !== "";
        const countryValid = document.getElementById("country").value.trim() !== "";
        const genderValid = document.querySelector('input[name="gender"]:checked');
        const languageValid = document.querySelectorAll('input[name="language"]:checked').length > 0;

        if (!firstNameValid || !lastNameValid || !emailValid || !passwordValid || !confirmPasswordValid || !dateValid || !cityValid || !stateValid || !countryValid || !genderValid || !languageValid) {
            setAlertMessage("* Please fill all details");
            return false;
        }
        return true;
    }

    function submitForm(event) {
        event.preventDefault();
        if (validateForm()) {
            navigate('/login');
            return true;
        }
        return false;
    }

    return (
        <div className="container">
            <h2>User Registration Form</h2>
            <form id="registrationForm" onSubmit={(e) => submitForm(e)}>
                <input type="text"  className={Register.firstName} id="firstName" placeholder="First Name" onKeyUp={checkFirstName} required />
                <error id="firstNameError" className={Register.error} style={{ color: 'red' }}></error>
                <input type="text" id="lastName" placeholder="Last Name" className={Register.lastName} onKeyUp={checkLastName} required />
                <error id="lastNameError" className={Register.error} style={{ color: 'red' }}></error>
                <input type="text" id="email" placeholder="Email" className={Register.email} onKeyUp={checkEmail} required />
                <error id="emailError" className={Register.error} style={{ color: 'red' }}></error>
                <div className="text-container">
                    <input type="password" id="password" placeholder="Password" className={Register.password} onKeyUp={checkPassword} required />
                    <input type="checkbox" onClick={() => togglePassword('password')} className={Register.btn} />
                </div>
                <error id="passwordError" className={Register.error} style={{ color: 'red' }}></error>
                <div className="text-container">
                    <input type="password" id="confirmPassword" placeholder="Confirm Password" className={Register.confirmPassword} onKeyUp={validatePassword} required />
                    <input type="checkbox" onClick={() => togglePassword('confirmPassword')} className={Register.btn} />
                </div>
                <error id="confirmError" className={Register.error} style={{ color: 'red' }}></error>
                <input type="text" id="date" placeholder="Date of birth" className={`${Register.textboxN} ${Register.date}`} onKeyUp={validateDate} onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} />
                <error id="dateError" className={Register.error} style={{ color: 'red' }}></error>
                <input type="text" id="city" placeholder="City" className={Register.city} required onKeyUp={(e) => autocompleteCity(e.target)} />
                <div id="autocomplete-container"></div>
                <select id="state" name="state" className={Register.state} required>
                    <option value="">Select State</option>
                </select>
                <select id="country" name="country" onChange={states} className={Register.country} required>
                    <option value="India" selected>India</option>
                    <option value="China">China</option>
                    <option value="Korea">Korea</option>
                    <option value="Japan">Japan</option>
                </select>
                <div>
                    Gender:<br />
                    <input type="radio" id="male" name="gender" value="male" className={Register.gender} required />
                    <label htmlFor="male">Male</label>
                    <input type="radio" id="female" name="gender" value="female" className={Register.gender} />
                    <label htmlFor="female">Female</label>
                    <input type="radio" id="other" name="gender" value="other" className={Register.gender} />
                    <label htmlFor="other">Prefer not to Say</label>
                </div>
                <br />
                <div>
                    Language preferences:<br />
                    <input type="checkbox" id="lang1" name="language" value="English" className={Register.language} />
                    <label htmlFor="lang1">English</label>
                    <input type="checkbox" id="lang2" name="language" value="Spanish" className={Register.language} />
                    <label htmlFor="lang2">Spanish</label>
                    <input type="checkbox" id="lang3" name="language" value="French" className={Register.language} />
                    <label htmlFor="lang3">French</label>
                    <input type="checkbox" id="lang4" name="language" value="German" className={Register.language} />
                    <label htmlFor="lang4">German</label>
                    <input type="checkbox" id="lang5" name="language" value="Chinese" className={Register.language} />
                    <label htmlFor="lang5">Japanese</label><br />
                    <input type="checkbox" id="lang6" name="language" value="Korean" className={Register.language} />
                    <label htmlFor="lang6">Korean</label>
                    <input type="checkbox" id="lang7" name="language" value="Arabic" className={Register.language} />
                    <label htmlFor="lang7">Chinese</label>
                    <input type="checkbox" id="lang8" name="language" value="Japanese" className={Register.language} />
                    <label htmlFor="lang8">Arabic</label> &nbsp;
                    <input type="checkbox" id="lang9" name="language" value="Russian" className={Register.language} />
                    <label htmlFor="lang9">Russian</label>
                    <input type="checkbox" id="lang10" name="language" value="Hindi" className={Register.language} />
                    <label htmlFor="lang10">Hindi</label>
                </div>
                <br /><br />
                <div>
                    <error id="alert" className={Register.error} style={{ color: 'red' }}>{alertMessage}</error>
                </div>
                <input type="submit" value="Register" id="register" className={Register.btn} />
            </form>
        </div>
    );
}

export default Home;
