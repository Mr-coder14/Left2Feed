import React from 'react';
import { Heart, Target, Eye, Users, Shield, Globe, Award, Zap } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Compassion",
      description: "Every meal shared is an act of love and care for our community",
      color: "text-red-600"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Trust",
      description: "Building secure connections between verified donors and receivers",
      color: "text-blue-600"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Efficiency",
      description: "AI-powered matching ensures food reaches those in need quickly",
      color: "text-yellow-600"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Sustainability",
      description: "Creating a circular economy that reduces waste and feeds communities",
      color: "text-green-600"
    }
  ];

  const impact = [
    { number: "847,532", label: "Meals Rescued", icon: "🍽️" },
    { number: "2,341", label: "NGOs Connected", icon: "🤝" },
    { number: "156", label: "Cities Covered", icon: "🏙️" },
    { number: "95%", label: "Success Rate", icon: "✅" }
  ];

  const team = [
    {
      name: "Rajesh K",
      role: "Founder & CEO",
      image: "https://raw.githubusercontent.com/Rajesh-k11/Left2feed/main/Pics/WhatsApp%20Image%202025-06-30%20at%2000.54.35_63608bea.jpg",
      bio: "Former tech executive passionate about solving hunger through technology"
    },
    {
      name: "Dineshwaran",
      role: "CTO",
      image: "https://raw.githubusercontent.com/Rajesh-k11/Left2feed/main/Pics/dinesh.jpg",
      bio: "AI expert focused on optimizing food distribution networks"
    },
    {
      name: "Jeeva R",
      role: "Head of Operations",
      image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio: "NGO veteran with 15+ years in community outreach and food security"
    },
    {
      name: "Chandru R",
      role: "Head of Technology",
      image: "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio: "Full-stack developer specializing in scalable platforms and mobile applications"
    }
  ];

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <Heart className="h-20 w-20 text-accent-300 mx-auto mb-6 animate-pulse" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Left2Feed
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              We believe in a world where no food goes to waste while someone goes hungry. 
              Our mission is to bridge the gap between surplus and need through technology and compassion.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Target className="h-12 w-12 text-primary-600 mr-4" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                To eliminate food waste and combat hunger by creating an intelligent, 
                secure platform that connects surplus food from donors with verified 
                NGOs, shelters, and community organizations across India.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                We leverage AI technology to ensure food reaches those who need it most, 
                creating a sustainable ecosystem of sharing and care.
              </p>
            </div>
            
            <div>
              <div className="flex items-center mb-6">
                <Eye className="h-12 w-12 text-secondary-600 mr-4" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                To create a world where no food is wasted while someone is in need. 
                We envision communities where sharing surplus food is as natural as 
                breathing, supported by technology that makes it effortless and secure.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                By 2030, we aim to rescue 10 million meals annually and establish 
                Left2Feed as the leading food rescue platform across South Asia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className={`${value.color} flex justify-center mb-4`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Impact So Far
            </h2>
            <p className="text-xl text-primary-100">
              Together, we're creating meaningful change
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {impact.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-primary-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Passionate individuals working to end food waste and hunger
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Started */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It All Started
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-primary-600" />
                </div>
              </div>
              <div>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  "It was during a wedding in 2023 when I saw tons of perfectly good food being thrown away 
                  while knowing that millions go to bed hungry every night. That moment sparked the idea for Left2Feed."
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "We started with a simple WhatsApp group connecting wedding organizers with local NGOs. 
                  Within months, we realized the potential for a technology-driven solution that could scale 
                  this impact across the country."
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  "Today, Left2Feed is more than just a platform—it's a movement of compassionate individuals 
                  and organizations working together to ensure no food goes to waste while someone goes hungry."
                </p>
                <div className="mt-6">
                  <p className="font-semibold text-gray-900 dark:text-white">- Rajesh K, Founder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recognition */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Award className="h-16 w-16 text-accent-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Recognition & Awards
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Social Impact Award 2024
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Recognized by the Ministry of Social Justice for outstanding contribution to food security
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Tech for Good 2024
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Winner of the National Technology Innovation Challenge for social impact
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                UN SDG Champion
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Recognized for contributing to UN Sustainable Development Goals 2 & 12
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Mission
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Be part of the solution. Every meal shared makes a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="bg-white text-primary-700 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Start Sharing Food
            </a>
            <a
              href="/volunteer"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Become a Volunteer
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;