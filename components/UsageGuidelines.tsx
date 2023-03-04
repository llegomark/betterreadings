const UsageGuidelines: React.FC = () => {
  return (
    <div className="mt-2 rounded-lg bg-yellow-200 p-4 text-start text-base text-slate-900 sm:text-lg lg:text-lg">
      <h2 className="mb-2 font-bold">Usage Guidelines:</h2>
      <p className="mb-4">
        The generated reading passages are intended for educational use only.
        They are not to be used for commercial purposes or distributed for
        profit.
      </p>
      <p className="mb-4">
        Users are not allowed to remove the author title from the reading
        passages. This ensures that credit is given to the creators of the
        content and helps to protect their intellectual property rights.
      </p>
      <p className="mb-4">
        The reading passages may be used by teachers, students, or parents for
        non-commercial educational purposes. They may be used in the classroom,
        for homeschooling, or for personal study.
      </p>
      <p className="mb-4">
        Users are encouraged to use the reading passages creatively,
        incorporating them into lesson plans, activities, or assessments.
        However, the passages should not be altered in a way that changes their
        original meaning or intent.
      </p>
      <p className="mb-4">
        The reading passages are not to be used for any illegal, unethical, or
        inappropriate activities. Users should respect copyright law, plagiarism
        guidelines, and other relevant ethical considerations.
      </p>
      <h2 className="mb-2 font-bold">License:</h2>
      <p className="mb-4">
        The reading passages are licensed under a{" "}
        <a
          href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-blue-600 hover:text-blue-800"
        >
          Creative Commons Attribution-NonCommercial-NoDerivatives 4.0
          International License
        </a>
        . This means that users are free to share, copy, and redistribute the
        material in any medium or format, as long as they give appropriate
        credit to the creators, do not use the material for commercial purposes,
        and do not modify or adapt the material in any way.
      </p>
      <p>
        In addition to these guidelines, users are granted a creative license to
        use the generated reading passages in their own unique and creative
        ways. However, users should always respect the original intent and
        meaning of the passages, and avoid using them in any way that could be
        harmful, inappropriate, or unethical.
      </p>
    </div>
  );
};
export default UsageGuidelines;
