'use client';

import { motion } from 'framer-motion';
import TeamCard from '@/components/team/TeamCard';
import teamData from '@/data/team.json';

// Domain Icons Component
const DomainIcon = ({ domain, color }) => {
  const icons = {
    'AI/ML': (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 32 32" className="h-10 w-10">
        <circle fill={color} cx="16" cy="16" r="3"/>
        <circle fill="none" stroke={color} strokeWidth="2" cx="16" cy="16" r="10"/>
        <circle fill="none" stroke={color} strokeWidth="1.5" cx="16" cy="5" r="1.5"/>
        <circle fill="none" stroke={color} strokeWidth="1.5" cx="16" cy="27" r="1.5"/>
        <circle fill="none" stroke={color} strokeWidth="1.5" cx="5" cy="16" r="1.5"/>
        <circle fill="none" stroke={color} strokeWidth="1.5" cx="27" cy="16" r="1.5"/>
        <path fill="none" stroke={color} strokeWidth="1.5" d="M16 6v4m0 12v4M6 16h4m12 0h4"/>
      </svg>
    ),
    'App Development': (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 32 32" className="h-10 w-10">
        <path fill={color} d="M15.383 18.316l3.361-3.274H8.279L1.653 8.284 18.744.001l7.912 7.912z" transform="scale(0.8) translate(4, 4)"/>
        <path fill={color} d="M18.744 15.006l7.912 7.912-7.912 7.912-4.106-4.106 3.274-3.274-3.274-3.274z" transform="scale(0.8) translate(4, 4)"/>
      </svg>
    ),
    'DSA/CP': (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 32 32" className="h-10 w-10">
        <rect fill="none" stroke={color} strokeWidth="2" x="2" y="2" width="28" height="28" rx="2"/>
        <polyline fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points="12 8 8 12 12 16"/>
        <polyline fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points="20 8 24 12 20 16"/>
        <line fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" x1="16" y1="6" x2="14" y2="18"/>
      </svg>
    ),
    'Cyber Security': (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" className="h-10 w-10">
        <path fill={color} d="M12 2L4 6v5c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z"/>
        <path fill="#fff" d="M12 7c-1.7 0-3 1.3-3 3 0 .8.3 1.5.8 2L9 15h6l-.8-3c.5-.5.8-1.2.8-2 0-1.7-1.3-3-3-3zm0 4c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"/>
      </svg>
    )
  };
  
  return icons[domain] || null;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-[#fafafa] dark:bg-gray-800">
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#1e1e1e] dark:text-white"
              style={{ fontFamily: 'Google Sans, sans-serif' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Meet Our Team
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-[#5f6368] dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Our team is committed to fostering a vibrant community of developers, learners, and innovators. 
              We organize events, workshops, and study sessions to help everyone grow their technical skills 
              and connect with fellow developers. Together, we're building a supportive environment where 
              everyone can learn, share, and succeed.
            </motion.p>
          </motion.div>
        </div>
      </section>



      {/* Faculty Coordinators */}
      {teamData.coordinators && teamData.coordinators.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6 md:px-8 max-w-7xl">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-12 text-[#1e1e1e] dark:text-white text-center"
              style={{ fontFamily: 'Google Sans, sans-serif' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Faculty Coordinators
            </motion.h2>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {teamData.coordinators.map((member) => (
                <motion.div key={member.id} variants={itemVariants}>
                  <TeamCard member={member} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Core Team */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-12 text-[#1e1e1e] dark:text-white text-center"
            style={{ fontFamily: 'Google Sans, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Core Team
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {teamData.coreTeam.map((member) => (
              <motion.div key={member.id} variants={itemVariants}>
                <TeamCard member={member} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Technical Teams */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1e1e1e] dark:text-white text-center" style={{ fontFamily: 'Google Sans, sans-serif' }}>
              Technical Teams
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              Our technical domain experts driving innovation and learning
            </p>
          </motion.div>

          {/* AI/ML Domain */}
          {teamData.domains?.aiml && teamData.domains.aiml.members.length > 0 && (
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-8 p-4 rounded-2xl border-2" style={{ borderColor: teamData.domains.aiml.color, backgroundColor: `${teamData.domains.aiml.color}10` }}>
                <motion.div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: `${teamData.domains.aiml.color}20` }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <DomainIcon domain="AI/ML" color={teamData.domains.aiml.color} />
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#1e1e1e] dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                  {teamData.domains.aiml.name}
                </h3>
              </div>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {teamData.domains.aiml.members.map((member) => (
                  <motion.div key={member.id} variants={itemVariants}>
                    <TeamCard member={member} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* App Development Domain */}
          {teamData.domains?.appdev && teamData.domains.appdev.members.length > 0 && (
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-8 p-4 rounded-2xl border-2" style={{ borderColor: teamData.domains.appdev.color, backgroundColor: `${teamData.domains.appdev.color}10` }}>
                <motion.div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: `${teamData.domains.appdev.color}20` }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <DomainIcon domain="App Development" color={teamData.domains.appdev.color} />
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#1e1e1e] dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                  {teamData.domains.appdev.name}
                </h3>
              </div>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {teamData.domains.appdev.members.map((member) => (
                  <motion.div key={member.id} variants={itemVariants}>
                    <TeamCard member={member} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* DSA/CP Domain */}
          {teamData.domains?.dsa && teamData.domains.dsa.members.length > 0 && (
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-8 p-4 rounded-2xl border-2" style={{ borderColor: teamData.domains.dsa.color, backgroundColor: `${teamData.domains.dsa.color}10` }}>
                <motion.div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: `${teamData.domains.dsa.color}20` }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <DomainIcon domain="DSA/CP" color={teamData.domains.dsa.color} />
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#1e1e1e] dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                  {teamData.domains.dsa.name}
                </h3>
              </div>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {teamData.domains.dsa.members.map((member) => (
                  <motion.div key={member.id} variants={itemVariants}>
                    <TeamCard member={member} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Cyber Security Domain */}
          {teamData.domains?.cyber && teamData.domains.cyber.members.length > 0 && (
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-8 p-4 rounded-2xl border-2" style={{ borderColor: teamData.domains.cyber.color, backgroundColor: `${teamData.domains.cyber.color}10` }}>
                <motion.div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: `${teamData.domains.cyber.color}20` }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <DomainIcon domain="Cyber Security" color={teamData.domains.cyber.color} />
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#1e1e1e] dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                  {teamData.domains.cyber.name}
                </h3>
              </div>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {teamData.domains.cyber.members.map((member) => (
                  <motion.div key={member.id} variants={itemVariants}>
                    <TeamCard member={member} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Non-Technical Teams */}
      {teamData.domains?.nontech && teamData.domains.nontech.members.length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6 md:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1e1e1e] dark:text-white text-center" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                Non-Technical Teams
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                The backbone of our operations and community engagement
              </p>
            </motion.div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {teamData.domains.nontech.members.map((member) => (
                <motion.div key={member.id} variants={itemVariants}>
                  <TeamCard member={member} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

    </main>
  );
}
