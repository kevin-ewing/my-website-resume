// RELOAD TIMELINE

var tl = gsap.timeline();

tl.fromTo(
  ".aboutSection",
  { opacity: 0, y: 100 },
  {
    opacity: 1,
    y: 0,
    ease: "power2.out",
    duration: 0.6,
  }
);

tl.fromTo(
  ".nameSection",
  { opacity: 0, y: 100 },
  {
    opacity: 1,
    y: 0,
    ease: "power2.out",
    duration: 0.6,
  }
);

tl.fromTo(
  ".socialLink",
  { opacity: 0, x: 100 },
  {
    opacity: 1,
    x: 0,
    ease: "power2.out",
    duration: 1,
  }
);

// TIMELINE 2

var tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".skillSection",
    start: "0% 84%",
    end: "10% 70%",
    // scrub: true,
    // markers: true,
  },
});

tl2.fromTo(
  "#lang",
  { opacity: 0, y: 100 },
  {
    opacity: 1,
    y: 0,
    ease: "power.out",
    duration: 1,
  }
);

tl2.fromTo(
  "#frame",
  { opacity: 0, y: 100 },
  {
    opacity: 1,
    y: 0,
    ease: "power.out",
    duration: 1,
  }
);

tl2.fromTo(
  "#devops",
  { opacity: 0, y: 100 },
  {
    opacity: 1,
    y: 0,
    ease: "power.out",
    duration: 1,
  }
);

// TIMELINE 3

var tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".experience",
    start: "10% 80%",
    end: "50% 70%",
  },
});

tl3.fromTo(
  ".companySection",
  { opacity: 0, x: -100 },
  {
    opacity: 1,
    x: 0,
    ease: "power.out",
    duration: 1,
  }
);

tl3.fromTo(
  ".experienceSection",
  { opacity: 0, y: 100 },
  {
    opacity: 1,
    y: 0,
    ease: "power.out",
    duration: 2,
  }
);

// TIMELINE 4

var tl4 = gsap.timeline({
  scrollTrigger: {
    trigger: ".projects",
    start: "10% 80%",
    end: "50% 70%",
  },
});

tl4.fromTo(
  ".projects",
  { opacity: 0, y: 100 },
  {
    opacity: 1,
    y: 0,
    ease: "power.out",
    duration: 2,
  }
);

// TIMELINE 5

var tl5 = gsap.timeline({
  scrollTrigger: {
    trigger: ".contact",
    start: "0% 80%",
    end: "50% 70%",
  },
});

tl5.fromTo(
  ".contact",
  { opacity: 0, y: 100 },
  {
    opacity: 1,
    y: 0,
    ease: "power.out",
    duration: 1,
  }
);

document.addEventListener("DOMContentLoaded", function() {
  const colors = ["#0364f2", "#058500", "#ff4300", "#eeba00"];
  
  // Function to get a random color from the array
  function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  // Function to get a random gradient
  function getRandomGradient() {
    const color1 = getRandomColor();
    let color2 = getRandomColor();
    while (color1 === color2) {
      color2 = getRandomColor();
    }
    return `linear-gradient(135deg, ${color1}, ${color2})`;
  }
  
  // Apply the gradient to the navbar
  const navbar = document.querySelector(".navbar");
  navbar.style.background = getRandomGradient();
  
  // Add hover effect to social links
  const socialLinks = document.querySelectorAll(".socialLink");
  socialLinks.forEach(link => {
    link.addEventListener("mouseenter", function() {
      link.style.background = getRandomGradient();
    });
    link.addEventListener("mouseleave", function() {
      link.style.background = "#131315";
    });
  });

  // Function to set a random border-top color
  function setRandomBorderTopColor() {
    const downArrow = document.querySelector(".down-arrow");
    if (downArrow) {
      downArrow.style.borderTopColor = getRandomColor();
    }
  }

  // Set random border-top color on page load
  setRandomBorderTopColor();
  
  // Set random background color for each company skill name
  const companySkills = document.querySelectorAll(".companySkillName");
  companySkills.forEach(skill => {
    skill.style.backgroundColor = getRandomColor();
  });
});
