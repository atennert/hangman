import { Routes } from './router';

// tslint:disable:max-line-length
const ABOUT_SECTION_CONTENT = `<h1>Hangman</h1>
<h2>About</h2>
<p>Legal statement in accordance with § 5 Telemedia Act (TMG) and person responsible for content in accordance with § 55 para. 2 RStV</p>
<p>Andreas Tennert<br>
  91056 Erlangen Germany</p>
<h3>Contact</h3>
<p>E-mail: <span class="email"></span><br/>
  Internet addresses:
  <a href="http://andreas-tennert.de">andreas-tennert.de</a>,
  <a href="http://atennert.de">atennert.de</a>,
  <a href="https://hangman.andreas-tennert.de">hangman.andreas-tennert.de</a></p>
<h3>Disclaimer</h3>
<h4>Accountability for content</h4>
<p>The contents of our pages have been created with the utmost care. However, we cannot guarantee the contents' accuracy, completeness or topicality. According to statutory provisions, we are furthermore responsible for our own content on these web pages. In this context, please note that we are accordingly not obliged to monitor merely the transmitted or saved information of third parties, or investigate circumstances pointing to illegal activity. Our obligations to remove or block the use of information under generally applicable laws remain unaffected by this as per §§ 8 to 10 of the TMG.</p>
<h4>Accountability for links</h4>
<p>Responsibility for the content of external links (to web pages of third parties) lies solely with the operators of the linked pages. No violations were evident to us at the time of linking. Should any legal infringement become known to us, we will remove the respective link immediately.</p>
<h4>Copyright</h4>
<p>Our web pages and their contents are subject to German copyright law. Unless expressly permitted by law (§ 44a et seq. of the copyright law), every form of utilizing, reproducing or processing works subject to copyright protection on our web pages requires the prior consent of the respective owner of the rights. Individual reproductions of a work are allowed only for private use, so must not serve either directly or indirectly for earnings. Unauthorized utilization of copyrighted works is punishable (§ 106 of the copyright law).</p>
<h4>Data protection</h4>
<p>The usage of our website is possible without the statement of personal data.</p>
<p>We point out that the data transmission in the internet (e.g. communication via email) can possess security flaws. A flawless protection of data against the access by third parties is impossible.</p>
<p>We expressly object to the utilization of contact data published within the bounds of imprint obligation by a third party for the purpose of providing not specifically requested advertisements and information.</p>
<br><br>

<h2>Privacy Policy</h2>
<p>At Hangman, accessible from <a href="https://hangman.andreas-tennert.de">hangman.andreas-tennert.de</a>, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Hangman and how we use it.</p>
<p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us through email at <span class="email"></span></p>
<h3>General Data Protection Regulation (GDPR)</h3>
<p>We are a Data Controller of your information.</p>
<p>Hangman legal basis for collecting and using the personal information described in this Privacy Policy depends on the Personal Information we collect and the specific context in which we collect the information:</p>
<ul>
  <li>Hangman needs to perform a contract with you</li>
  <li>You have given Hangman permission to do so</li>
  <li>Processing your personal information is in Hangman legitimate interests</li>
  <li>Hangman needs to comply with the law</li>
</ul>
<p>Hangman will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.</p>
<p>If you are a resident of the European Economic Area (EEA), you have certain data protection rights. If you wish to be informed what Personal Information we hold about you and if you want it to be removed from our systems, please contact us.</p>
<p>In certain circumstances, you have the following data protection rights:</p>
<ul>
  <li>The right to access, update or to delete the information we have on you.</li>
  <li>The right of rectification.</li>
  <li>The right to object.</li>
  <li>The right of restriction.</li>
  <li>The right to data portability</li>
  <li>The right to withdraw consent</li>
</ul>
<h3>Log Files</h3>
<p>Hangman follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</p>
<h3>Third Pary Privacy Policies</h3>
<p>Hangman's Privacy Policy does not apply to other websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party websites for more detailed information. It may include their practices and instructions about how to opt-out of certain options. You may find these Privacy Policies on the linked websites:</p>
<p>You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites. What Are Cookies?</p>
<h3>Children's Information</h3>
<p>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</p>
<p>Hangman does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>
<h3>Online Privacy Policy Only</h3>
<p>This privacy policy (<a href="https://gdprprivacynotice.com">GDPR Privacy Policy created at GDPRPrivacyNotice.com</a>) applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Hangman. This policy is not applicable to any information collected offline or via channels other than this website.</p>
<h3>Consent</h3>
<p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>`;
// tslint:enable:max-line-length

export class About {
  constructor(gameRoot: HTMLDivElement) {
    const container = document.createElement('div');
    container.className = 'about';
    container.innerHTML = ABOUT_SECTION_CONTENT;
    const obj = 'm' + '&#97;' + '&#105;l' + 't&#111;';
    const link = 'hr' + 'ef=';
    let trgt = '&#109;a&#105;' + '&#108;&#64;';
    trgt = trgt + '&#97;n' + 'dr&#101;' + 'a&#115;-t' + 'e&#110;ne' + '&#114;t' + '&#46;d' + '&#101;';
    const tgtt = '&#109;a&#105;' + '&#108;&#64;&#97;n' + 'dr&#101;' + 'a&#115;-t' + 'e&#110;ne' + '&#114;t' + '&#46;d&#101;',
      emailContent = `<a ${link}"${obj}:${trgt}">${tgtt}</a>`;
    const emails = container.querySelectorAll('.email');

    [].forEach.call(emails, (email: HTMLSpanElement) => {
      email.innerHTML = emailContent;
    });

    const navigation = document.createElement('nav'),
      menuLink = document.createElement('a');

    menuLink.textContent = 'Back to Menu';
    menuLink.href = Routes.Menu;
    menuLink.className = 'menu__link';
    navigation.appendChild(menuLink);

    container.appendChild(navigation);
    gameRoot.appendChild(container);
  }
}
