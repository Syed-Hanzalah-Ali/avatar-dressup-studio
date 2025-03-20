
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Upload, Shirt, User, Database } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6 font-semibold"
            >
              Create Your Virtual Fashion Identity
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-8 text-lg text-muted-foreground"
            >
              Upload your photo, input your measurements, and transform into a 3D avatar. 
              Try on different clothing designs and discover your perfect style.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" asChild className="gap-2">
                <Link to="/avatar">
                  Get Started <ArrowRight size={16} />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/catalog">Explore Catalog</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/3 -translate-y-1/2 right-0 w-1/4 h-1/4 bg-primary/5 rounded-full blur-3xl -z-10" />
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our advanced 3D technology makes it easy to create your digital twin and visualize clothing before purchase.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-card shadow-sm"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                <Upload size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Upload & Measure</h3>
              <p className="text-muted-foreground">
                Upload your photo and provide your measurements to create an accurate 3D model of yourself.
              </p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-card shadow-sm"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                <User size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">3D Avatar Creation</h3>
              <p className="text-muted-foreground">
                Our AI technology converts your image into a realistic 3D avatar that matches your proportions.
              </p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-card shadow-sm"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                <Shirt size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Virtual Try-On</h3>
              <p className="text-muted-foreground">
                Browse our catalog and virtually try on clothing to see how they would look on your body.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4">Ready to Transform Your Shopping Experience?</h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of users who are already enjoying a personalized fashion experience with our virtual try-on technology.
            </p>
            <Button size="lg" asChild>
              <Link to="/avatar">Create Your Avatar</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Admin Feature Section - Only for demo purposes */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-lg">
              <h3 className="text-2xl font-medium mb-4">For Clothing Designers</h3>
              <p className="text-muted-foreground mb-6">
                Are you a designer? Access the admin dashboard to upload and manage your clothing designs in our catalog.
              </p>
              <Button variant="outline" asChild className="gap-2">
                <Link to="/admin">
                  <Database size={16} />
                  Access Admin Dashboard
                </Link>
              </Button>
            </div>
            <div className="w-full max-w-md p-1 bg-gradient-to-tr from-primary/20 to-secondary rounded-lg">
              <div className="bg-card p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-2">Admin Features</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <span className="text-xs font-medium">✓</span>
                    </div>
                    <p className="text-sm">Upload new clothing designs</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <span className="text-xs font-medium">✓</span>
                    </div>
                    <p className="text-sm">Manage existing catalog items</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <span className="text-xs font-medium">✓</span>
                    </div>
                    <p className="text-sm">View user statistics and feedback</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
