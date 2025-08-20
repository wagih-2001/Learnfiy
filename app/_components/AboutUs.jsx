import { Award, DollarSign, Truck, Headphones, Users, BookOpen, Globe, Star } from 'lucide-react';

export default function AboutUs() {
  return (
    <div id="about-us" className="min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            About Us
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Welcome to{' '}
            <span className="font-semibold text-primary">Learnify</span> – your
            trusted destination for professional technical training. We are
            passionate about equipping learners with skills that match today’s
            fast-changing technology landscape.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Our mission is simple: to provide high-quality, hands-on training in
            software development, IT, and emerging tech — all at fair prices,
            with expert guidance every step of the way.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Thank you for choosing us. Your growth drives our innovation.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {[
            { title: '10+ Years', subtitle: 'Experience', icon: <Star className="w-8 h-8 text-primary" /> },
            { title: '5k+', subtitle: 'Happy Students', icon: <Users className="w-8 h-8 text-primary" /> },
            { title: '200+', subtitle: 'Courses', icon: <BookOpen className="w-8 h-8 text-primary" /> },
            { title: '50+', subtitle: 'Countries Reached', icon: <Globe className="w-8 h-8 text-primary" /> }
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-3">{stat.icon}</div>
              <h3 className="text-xl font-bold text-gray-900">{stat.title}</h3>
              <p className="text-gray-600">{stat.subtitle}</p>
            </div>
          ))}
        </div>

      </div>

      <div className="max-w-6xl mx-auto mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { title: 'Expert Instructors', icon: <Award className="w-10 h-10 text-primary mx-auto" /> },
          { title: 'Affordable Prices', icon: <DollarSign className="w-10 h-10 text-primary mx-auto" /> },
          { title: 'Flexible Learning', icon: <Truck className="w-10 h-10 text-primary mx-auto" /> },
          { title: 'Student Support', icon: <Headphones className="w-10 h-10 text-primary mx-auto" /> }
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition"
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
