"use client";
import React, { useState } from "react";

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add your form submission logic here (e.g., send data to an API)
    console.log("Email:", email);
    console.log("Message:", message);
  };

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-4 text-center text-gray-900">CONTACT US</div>
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
        Drop Us a Line
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
          />
        </div>
        <div>
          <label htmlFor="message" className="block font-medium text-gray-700">
            Message:
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
          />
        </div>
        <button
          type="submit"
          className="bg-primary w-full rounded px-4 py-3 font-semibold text-white uppercase transition hover:bg-blue-700"
        >
          Send Now
        </button>
      </form>
    </div>
  );
}
