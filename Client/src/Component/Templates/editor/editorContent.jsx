import { cmdClear } from "./consts";

export const modules = [
  {
    id: "1",
    category: "Modules",
    copyable: false,
    name: "Invoice Header",
    label:
      '<div class="module-view"><img draggable="false" style="width: 100%; height:70px"  src="https://charlie-dave.s3.amazonaws.com/assets_images/MicrosoftTeams-image+(5).png"></div>',

    content: {
      components: [
        {
          components: ` 
          
          
          <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
  <tbody>
    <tr valign="top">
      <td valign="top" style="padding: 20px;">
        <!-- Company Header -->
        <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
          <tbody>
            <tr>
              <td width="70%" style="font-size: 18px; font-weight: bold;">
                Name: {companyName}
              </td>
              <td width="30%">
                <a href="#" target="_blank" title="Company Logo">
                  <img src="https://via.placeholder.com/650x250.png" style="display: block; border: 0; max-width: 100%;" alt="Company Logo">
                </a>
              </td>
            </tr>
            <tr>
              <td width="70%" style="font-size: 16px;">
                To: Jhon Polo
                Los Angeles, CA
              </td>
              <td width="30%" style="font-size: 16px;">
                Invoice Date: 12-12-2024
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Invoice Items -->
        <table width="100%" cellspacing="0" cellpadding="0" border="1" style="border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr>
              <th style="padding: 10px; text-align: left;">Name</th>
              <th style="padding: 10px; text-align: left;">Description</th>
              <th style="padding: 10px; text-align: right;">Qty</th>
              <th style="padding: 10px; text-align: right;">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 10px;">Website</td>
              <td style="padding: 10px;">Best one</td>
              <td style="padding: 10px; text-align: right;">2</td>
              <td style="padding: 10px; text-align: right;">$1000</td>
            </tr>
          </tbody>
        </table>

        <!-- Invoice Summary -->
        <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="margin-top: 20px;">
          <tbody>
            <tr>
              <td width="75%"></td>
              <td width="15%" style="font-weight: bold;">Sub Total</td>
              <td width="10%" style="text-align: right;">$1000</td>
            </tr>
            <tr>
              <td width="75%"></td>
              <td width="15%" style="font-weight: bold;">Tax</td>
              <td width="10%" style="text-align: right;">$10</td>
            </tr>
            <tr>
              <td width="75%"></td>
              <td width="15%" style="font-weight: bold;">Total</td>
              <td width="10%" style="text-align: right; font-weight: bold;">$1010</td>
            </tr>
          </tbody>
        </table>

        <!-- Intro Text with CTA -->
      </td>
      <!-- End of Wrapper -->
    </tr>
  </tbody>
</table>
`,
        },
      ],
    },
  },
  {
    id: "2",
    category: "Modules",
    name: "Two Columns with CTA",
    label: `<div class="module-view"><img style="width: 100%; height:70px"  src="https://charlie-dave.s3.amazonaws.com/assets_images/MicrosoftTeams-image+(4).png" class="module-image"></div>`,

    content: `<table align="center" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="font-family: Arial, sans-serif; border-collapse: collapse;">
    <tbody>
        <tr valign="top">
            <td width="100%" align="center" style="padding: 20px;">
                <!-- Invoice Header -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tbody>
                        <tr>
                            <td width="20%" style="padding: 10px; font-weight: bold;">Invoice No.</td>
                            <td width="20%" style="padding: 10px; font-weight: bold;">Date</td>
                            <td width="20%" style="padding: 10px; font-weight: bold;">Customer ID</td>
                            <td width="40%" align="center" style="padding: 10px; font-size: 24px; font-weight: bold;">INVOICE</td>
                        </tr>
                        
                        <tr>
                            <td colspan="2" style="font-weight: bold; padding: 10px;">Company Name</td>
                            <td style="font-weight: bold; padding: 10px;">BILL TO</td>
                            <td style="font-weight: bold; padding: 10px;">SHIP TO</td>
                        </tr>
                    </tbody>
                </table>

                <!-- Invoice Items -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 20px;">
                    <thead>
                        <tr>
                            <th style="padding: 10px; background-color: #f2f2f2; font-weight: bold;">Item</th>
                            <th style="padding: 10px; background-color: #f2f2f2; font-weight: bold;">QTY</th>
                            <th style="padding: 10px; background-color: #f2f2f2; font-weight: bold;">Description</th>
                            <th style="padding: 10px; background-color: #f2f2f2; font-weight: bold;">Price</th>
                            <th style="padding: 10px; background-color: #f2f2f2; font-weight: bold;">Discount</th>
                            <th style="padding: 10px; background-color: #f2f2f2; font-weight: bold;">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Sample Data Row -->
                        <tr>
                            <td style="padding: 10px;">Product A</td>
                            <td style="padding: 10px;">2</td>
                            <td style="padding: 10px;">Sample Product Description</td>
                            <td style="padding: 10px;">$50.00</td>
                            <td style="padding: 10px;">$5.00</td>
                            <td style="padding: 10px;">$95.00</td>
                        </tr>
                        <!-- Add more rows as needed -->
                    </tbody>
                </table>

                <!-- Invoice Totals -->
                <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="margin-top: 20px;">
                    <tbody>
                        <tr>
                            <td width="75%"></td>
                            <td width="15%" style="font-weight: bold;">Sub Total</td>
                            <td width="10%" style="text-align: right;">$1000</td>
                        </tr>
                        <tr>
                            <td width="75%"></td>
                            <td width="15%" style="font-weight: bold;">Tax</td>
                            <td width="10%" style="text-align: right;">$10</td>
                        </tr>
                        <tr>
                            <td width="75%"></td>
                            <td width="15%" style="font-weight: bold;">Total</td>
                            <td width="10%" style="text-align: right; font-weight: bold;">$1010</td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
`,
  },
  {
    id: "3",
    category: "Modules",
    name: "Two Columns with Image",
    label: `<div class="module-view"><img style="width: 100%; height:70px"  src="https://charlie-dave.s3.amazonaws.com/assets_images/MicrosoftTeams-image+(1).png" class="module-image"></div>`,

    content: `<table align="center" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff">
    <tbody>
      <tr valign="top">
        <td align="center" style="padding-bottom:20px;">
          <table  align="left" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tbody>
              <tr valign="top">
                <td valign="top">
                  <table align="left" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tbody>
                      <tr>
        <td colspan="2" style="text-align: center; font-size: 30px; font-weight: bold; padding: 15px; border-bottom: 2px solid #f2f2f2;">INVOICE</td>
    </tr>
    <tr>
        <td colspan="2" style="text-align: center; font-weight: bold; padding: 10px; font-size: 24px; color: #007BFF;">Shadow Beauty</td>
    </tr>
    <tr>
        <td colspan="2" style="text-align: center; padding: 5px; font-size: 16px; color: #555;">Be Uniquely You</td>
    </tr>
    <tr>
        <td style="padding: 10px; border-bottom: 1px solid #f2f2f2;"><strong>To:</strong> Jenns Martennson</td>
        <td style="padding: 10px; border-bottom: 1px solid #f2f2f2;"><strong>Date:</strong> 10/19/2024</td>
    </tr>
    <tr>
        <td style="padding: 10px; border-bottom: 1px solid #f2f2f2;"><strong>Shipping Address:</strong> 321 Sycamore, Albany, NY 34567</td>
        <td style="padding: 10px; border-bottom: 1px solid #f2f2f2;"><strong>Invoice #:</strong> 54167</td>
    </tr>
    <tr>
        <td style="padding: 10px; border-bottom: 1px solid #f2f2f2;"><strong>Customer ID:</strong> BKO6948</td>
        <td style="padding: 10px; border-bottom: 1px solid #f2f2f2;"><strong>Phone:</strong> 916-555-0123</td>
    </tr>
    <tr>
        <td colspan="2" style="padding: 10px; border-bottom: 1px solid #f2f2f2;"><strong>Make all checks payable to:</strong> Shadow Beauty</td>
    </tr>
    <tr>
        <td colspan="2" style="padding: 10px; text-align: center; color: #777;">Street Address, City, ST ZIP Code, Phone, Fax, E-mail</td>
    </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table  align="right" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tbody>
              <tr>
        <th style="background-color: #f2f2f2; padding: 10px;">Salesperson</th>
        <th style="background-color: #f2f2f2; padding: 10px;">Job</th>
        <th style="background-color: #f2f2f2; padding: 10px;">Shipping Method</th>
        <th style="background-color: #f2f2f2; padding: 10px;">Shipping Terms</th>
        <th style="background-color: #f2f2f2; padding: 10px;">Delivery Date</th>
        <th style="background-color: #f2f2f2; padding: 10px;">Payment Terms</th>
        <th style="background-color: #f2f2f2; padding: 10px;">Due Date</th>
    </tr>
    <tr>
        <td style="padding: 10px;">Kendall Collins</td>
        <td style="padding: 10px;">Sales</td>
        <td style="padding: 10px;">Air express</td>
        <td style="padding: 10px;">N/A</td>
        <td style="padding: 10px;">10/19/2024</td>
        <td style="padding: 10px;">On delivery</td>
        <td style="padding: 10px;">10/26/2024</td>
    </tr>
    <tr>
        <th style="background-color: #f2f2f2; padding: 10px;">Qty</th>
        <th style="background-color: #f2f2f2; padding: 10px;">Item #</th>
        <th style="background-color: #f2f2f2; padding: 10px;">Description</th>
        <th style="background-color: #f2f2f2; padding: 10px;">Custom Column</th>
        <th style="background-color: #f2f2f2; padding: 10px;">Unit Price</th>
        <th style="background-color: #f2f2f2; padding: 10px;">Discount</th>
        <th style="background-color: #f2f2f2; padding: 10px;">Line Total</th>
    </tr>
    <tr>
        <td style="padding: 10px;">50</td>
        <td style="padding: 10px;">2452</td>
        <td style="padding: 10px;">Liquid foundation</td>
        <td style="padding: 10px;">Assorted shades</td>
        <td style="padding: 10px;">$2.75</td>
        <td style="padding: 10px;">$0.00</td>
        <td style="padding: 10px;">$137.50</td>
    </tr>
    <tr>
        <td style="padding: 10px;">30</td>
        <td style="padding: 10px;">6235</td>
        <td style="padding: 10px;">Eyeshadow palette</td>
        <td style="padding: 10px;">Assorted shades</td>
        <td style="padding: 10px;">$1.24</td>
        <td style="padding: 10px;">$0.00</td>
        <td style="padding: 10px;">$37.20</td>
    </tr>
    <tr>
        <td style="padding: 10px;">100</td>
        <td style="padding: 10px;">425</td>
        <td style="padding: 10px;">Lipstick</td>
        <td style="padding: 10px;">Assorted shades</td>
        <td style="padding: 10px;">$0.75</td>
        <td style="padding: 10px;">$0.25</td>
        <td style="padding: 10px;">$74.75</td>
    </tr>
    <tr>
        <td style="padding: 10px;">20</td>
        <td style="padding: 10px;">2562</td>
        <td style="padding: 10px;">Makeup brush set</td>
        <td style="padding: 10px;">Assorted sizes</td>
        <td style="padding: 10px;">$3.23</td>
        <td style="padding: 10px;">$0.15</td>
        <td style="padding: 10px;">$64.45</td>
    </tr>
    <tr>
        <td colspan="6" style="padding: 10px; text-align: right;"><strong>Total Discount</strong></td>
        <td style="padding: 10px;">$0.40</td>
    </tr>
    <tr>
        <td colspan="6" style="padding: 10px; text-align: right;"><strong>Subtotal</strong></td>
        <td style="padding: 10px;">$313.90</td>
    </tr>
    <tr>
        <td colspan="6" style="padding: 10px; text-align: right;"><strong>Sales Tax</strong></td>
        <td style="padding: 10px;">$0.00</td>
    </tr>
    <tr>
        <td colspan="6" style="padding: 10px; text-align: right;"><strong>Total</strong></td>
        <td style="padding: 10px; font-weight: bold;">$313.90</td>
    </tr>
    <tr>
        <td colspan="7" style="text-align: center; padding: 20px; font-size: 18px; font-weight: bold;">Thank you for your business!</td>
    </tr>
            </tbody>
          </table>
        </td>
        </td>
      </tr>
    </tbody>
  </table>`,
  },

  {
    id: "4",
    category: "Modules",
    name: "Three Columns",
    label: `<div class="module-view"><img style="width: 100%; height:70px"  src="https://charlie-dave.s3.amazonaws.com/assets_images/MicrosoftTeams-image+(3).png" class="module-image"></div>`,

    content: `<table
        cellpadding="0"
        cellspacing="0"
        border="0"
        width="100%"
       
      >
        <tr>
          <td  width="33%" valign="top">
  
          
          <p>  
               Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Mauris euismod vitae velit ut
              porttitor. Nunc ligula lacus, posuere vitae quam nec, malesuada
              tristique arcu. Vestibulum faucibus est est, nec pellentesque velit
              lobortis placerat. Sed nisi mauris, tincidunt a mollis eu, pulvinar
              non est.
      </p>
          </td>
          <td  width="33%" valign="top">
          <p>
               ultrices in odio. Phasellus
              facilisis sagittis risus sed rutrum. Nulla auctor volutpat metus,
              molestie congue augue hendrerit at. Donec gravida tincidunt diam ut
              eleifend. Curabitur posuere tempor blandit. Nam faucibus molestie
              justo eu ullamcorper. Nullam rutrum ligula vel risus finibus
              feugiat. Curabitur rutrum tristique auctor. Ut justo nisl, porttitor
              sit amet malesuada a, porttitor ac tellus
         </p>
          </td>
          <td  width="33%" valign="top">
           <p>
             feugiat faucibus ultrices in odio.
              Phasellus facilisis sagittis risus sed rutrum. Nulla auctor volutpat
              metus, molestie congue augue hendrerit at. Donec gravida tincidunt
              diam ut eleifend. Curabitur posuere tempor blandit. Nam faucibus
              molestie justo eu ullamcorper. Nullam rutrum ligula vel risus
              finibus feugiat. Curabitur rutrum tristique auctor. Ut justo nisl,
              porttitor sit amet malesuada a, porttitor ac tellus
         </p>
          </td>
        </tr>
      </table>`,
  },
  {
    id: "5",
    category: "Modules",
    name: "Five",
    label: `<div class="module-view"><img style="width: 100%; height:70px"  src="https://charlie-dave.s3.amazonaws.com/assets_images/MicrosoftTeams-image+(6).png" class="module-image"></div>`,

    content: `<table
        cellpadding="0"
        cellspacing="0"
        border="0"
        width="100%"
       
      >
        <tr>
          <td  width="25%" valign="top">
           <p>
               Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Mauris euismod vitae velit ut
              porttitor. Nunc ligula lacus, posuere vitae quam nec, malesuada
              tristique arcu. Vestibulum faucibus est est, nec pellentesque velit
              lobortis placerat. Sed nisi mauris, tincidunt a mollis eu, pulvinar
              non est.
          </p>
          </td>
          <td  width="50%" valign="top">
           <p>
              ultrices in odio. Phasellus
              facilisis sagittis risus sed rutrum. Nulla auctor volutpat metus,
              molestie congue augue hendrerit at. Donec gravida tincidunt diam ut
              eleifend. Curabitur posuere tempor blandit. Nam faucibus molestie
              justo eu ullamcorper. Nullam rutrum ligula vel risus finibus
              feugiat. Curabitur rutrum tristique auctor. Ut justo nisl, porttitor
              sit amet malesuada a, porttitor ac tellus
           </p>
          </td>
          <td  width="25%" valign="top">
            <p>
             feugiat faucibus ultrices in odio.
              Phasellus facilisis sagittis risus sed rutrum. Nulla auctor volutpat
              metus, molestie congue augue hendrerit at. Donec gravida tincidunt
              diam ut eleifend. Curabitur posuere tempor blandit. Nam faucibus
              molestie justo eu ullamcorper. Nullam rutrum ligula vel risus
              finibus feugiat. Curabitur rutrum tristique auctor. Ut justo nisl,
              porttitor sit amet malesuada a, porttitor ac tellus
          </p>
          </td>
        </tr>
      </table>`,
  },

  {
    id: "6",
    category: "Modules",
    name: "Six",
    label: `<div class="module-view"><img style="width: 100%; height:70px"  src="https://charlie-dave.s3.amazonaws.com/assets_images/MicrosoftTeams-image.png" class="module-image"></div>`,

    content: `<table
        cellpadding="0"
        cellspacing="0"
        border="0"
        width="100%"
        
      >
        <tr>
          <td  width="25%" valign="top">
            <p>
               Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Mauris euismod vitae velit ut
              porttitor. Nunc ligula lacus, posuere vitae quam nec, malesuada
              tristique arcu. Vestibulum faucibus est est, nec pellentesque velit
              lobortis placerat. Sed nisi mauris, tincidunt a mollis eu, pulvinar
              non est.
        </p>
          </td>
          <td  width="25%" valign="top">
            <p>
               ultrices in odio. Phasellus
              facilisis sagittis risus sed rutrum. Nulla auctor volutpat metus,
              molestie congue augue hendrerit at. Donec gravida tincidunt diam ut
              eleifend. Curabitur posuere tempor blandit. Nam faucibus molestie
              justo eu ullamcorper. Nullam rutrum ligula vel risus finibus
              feugiat. Curabitur rutrum tristique auctor. Ut justo nisl, porttitor
              sit amet malesuada a, porttitor ac tellus
          </p>
          </td>
          <td  width="25%" valign="top">
            <p>
              feugiat faucibus ultrices in odio.
              Phasellus facilisis sagittis risus sed rutrum. Nulla auctor volutpat
              metus, molestie congue augue hendrerit at. Donec gravida tincidunt
              diam ut eleifend. Curabitur posuere tempor blandit. Nam faucibus
              molestie justo eu ullamcorper. Nullam rutrum ligula vel risus
              finibus feugiat. Curabitur rutrum tristique auctor. Ut justo nisl,
              porttitor sit amet malesuada a, porttitor ac tellus
         </p>
          </td>
          <td  width="25%" valign="top">
           <p>
             feugiat faucibus ultrices in odio.
              Phasellus facilisis sagittis risus sed rutrum. Nulla auctor volutpat
              metus, molestie congue augue hendrerit at. Donec gravida tincidunt
              diam ut eleifend. Curabitur posuere tempor blandit. Nam faucibus
              molestie justo eu ullamcorper. Nullam rutrum ligula vel risus
              finibus feugiat. Curabitur rutrum tristique auctor. Ut justo nisl,
              porttitor sit amet malesuada a, porttitor ac tellus
           </p>
          </td>
        </tr>
      </table>`,
  },
  // {
  //   id: "7",
  //   category: "Modules",
  //   name: "Footer",
  //   label: `<div class="module-view"><img style="width: 100%; height:70px"  src="https://miro.medium.com/max/560/1*EJdEUtCo-ufulNheDhLQFw.png" class="module-image"></div>`,

  //   content: `<table cellpadding="0" cellspacing="0" border="0" class="tb-structure" align="center">
  //         <tr>
  //             <td class="" valign="top" style="padding:0 5px;">
  //                 <a href="#"><img src="https://via.placeholder.com/30x30.png" alt="" width="30"/>
  //             </td>
  //                 <td class="" valign="top" style="padding:0 5px;">
  //                 <a href="#"><img src="https://via.placeholder.com/30x30.png" alt="" width="30"/>
  //             </td>
  //             <td class="" valign="top" style="padding:0 5px;">
  //                 <a href="#"><img src="https://via.placeholder.com/30x30.png" alt="" width="30"/>
  //             </td>
  //             <td class="" valign="top" style="padding:0 5px;">
  //                 <a href="#"><img src="https://via.placeholder.com/30x30.png" alt="" width="30"/>
  //             </td>
  //             <td class="" valign="top" style="padding:0 5px;">
  //                 <a href="#"><img src="https://via.placeholder.com/30x30.png" alt="" width="30"/>
  //             </td>
  //         </tr>
  //     </table>`,
  // },
];

export const structures = [
  // {
  //   category: "Structures",
  //   label: "Dynamic Content",
  //   attributes: { class: "fa fa-magic" },
  //   content: `<div class="tb-structure dynamicS"><table
  //   cellpadding="0"
  //   cellspacing="0"
  //   border="0"
  //   width="100%"
  //   class="tb-structure active"
  //   id="default"
  // >
  //   <tr>
  //     <td style="padding:5px; border: 1px dashed #99ccff;" valign="top" >
  //       <span >

  //       </span>
  //     </td>
  //   </tr>

  // </table></div>`,
  // },

  {
    category: "Structures",
    label: "1 Column",
    attributes: { class: "gjs-fonts gjs-f-b1" },
    content: `<table cellpadding="0" cellspacing="0" border="0" width="100%" align="center" >
		<tr>
			<td  valign="top" style="padding:5px; border: 1px dashed #99ccff;  height:50px;" class="test">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" class="test">
      <tr>
      <td valign="top">

      </td>
      </tr>
    </table>
			</td>
		</tr>
	</table>`,
  },
  {
    category: "Structures",
    label: "2 Columns",
    attributes: { class: "gjs-fonts gjs-f-b2" },
    content: `<table cellpadding="0" cellspacing="0" border="0" width="100%"   align="center">
		<tr>
			<td style="padding:5px; border: 1px dashed #99ccff;  height:50px;" width="50%" valign="top">
				<table cellpadding="0" cellspacing="0" border="0" width="100%" >
					<tr>
					<td valign="top">

					</td>
					</tr>
				</table>
			</td>
			<td style="padding:5px; border: 1px dashed #99ccff;  height:50px;" width="50%" valign="top" >
				<table cellpadding="0" cellspacing="0" border="0" width="100%" >
					<tr>
					<td valign="top" >

					</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
`,
  },

  {
    category: "Structures",
    label: "3 Columns",
    attributes: { class: "gjs-fonts gjs-f-b3" },
    content: `<table cellpadding="0" cellspacing="0" border="0" width="100%"   align="center">
		<tr>
			<td style="padding:5px; border: 1px dashed #99ccff;  height:50px;" width="33%" valign="top">
				<table cellpadding="0" cellspacing="0" border="0" width="100%" >
					<tr>
					<td valign="top">

					</td>
					</tr>
				</table>
			</td>
			<td style="padding:5px; border: 1px dashed #99ccff;  height:50px;" width="33%" valign="top">
				<table cellpadding="0" cellspacing="0" border="0" width="100%" >
					<tr>
					<td valign="top">

					</td>
					</tr>
				</table>
			</td>
			<td style="padding:5px; border: 1px dashed #99ccff;  height:50px;" width="33%" valign="top">
				<table cellpadding="0" cellspacing="0" border="0" width="100%" >
					<tr>
					<td valign="top">

					</td>
					</tr>
				</table>
			</td>			
		</tr>
	</table>
`,
  },

  {
    category: "Structures",
    label: "3/7 Columns",
    attributes: { class: "gjs-fonts gjs-f-b37" },
    content: ` <table cellpadding="0" cellspacing="0" border="0" width="100%"   align="center">
		<tr>
			<td style="padding:5px; border: 1px dashed #99ccff;  height:50px;" width="30%" valign="top">
				<table cellpadding="0" cellspacing="0" border="0" width="100%">
					<tr>
					<td valign="top">

					</td>
					</tr>
				</table>
			</td>
			<td style="padding:5px; border: 1px dashed #99ccff;  height:50px;" width="70%" valign="top">
				<table cellpadding="0" cellspacing="0" border="0" width="100%">
					<tr>
					<td valign="top">

					</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
`,
  },

  {
    category: "Structures",
    label: "4 Columns",
    attributes: { class: "fourcolumn" },
    content: `<table cellpadding="0" cellspacing="0" border="0" width="100%" align="center">
		<tr>
			<td style="padding:5px; border: 1px dashed #99ccff;  height:50px;" width="25%" valign="top">
				<table cellpadding="0" cellspacing="0" border="0" width="100%" >
					<tr>
					<td valign="top">

					</td>
					</tr>
				</table>
			</td>
			<td style="padding:5px; border: 1px dashed #99ccff;  height:50px;" width="25%" valign="top">
				<table cellpadding="0" cellspacing="0" border="0" width="100%" >
					<tr>
					<td valign="top">

					</td>
					</tr>
				</table>
			</td>
			<td style="padding:5px; border: 1px dashed #99ccff;  height:50px;" width="25%" valign="top">
				<table cellpadding="0" cellspacing="0" border="0" width="100%" >
					<tr>
					<td valign="top">

					</td>
					</tr>
				</table>
			</td>
			<td style="padding:5px; border: 1px dashed #99ccff;  height:50px;" width="25%" valign="top">
				<table cellpadding="0" cellspacing="0" border="0" width="100%" >
					<tr>
					<td valign="top">

					</td>
					</tr>
				</table>
			</td>			
		</tr>
	</table>
`,
  },

  //   {
  //     category: "Structures",
  //     label: "Grid Items",
  //     attributes: { class: "fa fa-th" },
  //     content: `<table  style="box-sizing: border-box; margin-top: 0px; margin-right: auto; margin-bottom: 10px; margin-left: auto; padding-top: 5px; padding-right: 0px; padding-bottom: 5px; padding-left: 0px; width: 100%;" width="100%">
  //   <tbody style="box-sizing: border-box;">
  //     <tr style="box-sizing: border-box;">
  //       <td class="grid-item-cell2-l mobileViewBlock" style="box-sizing: border-box; vertical-align: top; padding-right: 10px; width: 50%;" width="50%" valign="top">
  //         <table class="grid-item-card " style="box-sizing: border-box; width: 100%; padding-top: 5px; padding-right: 0px; padding-bottom: 5px; padding-left: 0px; margin-bottom: 10px;" width="100%">
  //           <tbody style="box-sizing: border-box;">
  //             <tr style="box-sizing: border-box;">
  //               <td class="grid-item-card-cell" style="box-sizing: border-box; background-color: rgb(255, 255, 255); overflow-x: hidden; overflow-y: hidden; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; text-align: center; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;" bgcolor="rgb(255, 255, 255)" align="center">
  //                 <img src="http://placehold.it/250x150/78c5d6/fff/" alt="Image" class="grid-item-image" style="box-sizing: border-box; line-height: 150px; font-size: 50px; color: rgb(120, 197, 214); margin-bottom: 15px; width: 100%;">
  //                 <table class="grid-item-card-body" style="box-sizing: border-box;">
  //                   <tbody style="box-sizing: border-box;">
  //                     <tr style="box-sizing: border-box;">
  //                       <td class="grid-item-card-content" style="box-sizing: border-box; font-size: 13px; color: rgb(111, 119, 125); padding-top: 0px; padding-right: 10px; padding-bottom: 20px; padding-left: 10px; width: 100%; line-height: 20px;" width="100%">
  //                         <h1 class="card-title" style="box-sizing: border-box;  font-weight: 300; color: rgb(68, 68, 68);">Title here
  //                         </h1>
  //                         <p class="card-text" style="box-sizing: border-box;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
  //                         </p>
  //                       </td>
  //                     </tr>
  //                   </tbody>
  //                 </table>
  //               </td>
  //             </tr>
  //           </tbody>
  //         </table>
  //       </td>
  //       <td class="grid-item-cell2-r mobileViewBlock" style="box-sizing: border-box; vertical-align: top; padding-left: 10px; width: 50%;" width="50%" valign="top">
  //         <table class="grid-item-card" style="box-sizing: border-box; width: 100%; padding-top: 5px; padding-right: 0px; padding-bottom: 5px; padding-left: 0px; margin-bottom: 10px;" width="100%">
  //           <tbody style="box-sizing: border-box;">
  //             <tr style="box-sizing: border-box;">
  //               <td class="grid-item-card-cell" style="box-sizing: border-box; background-color: rgb(255, 255, 255); overflow-x: hidden; overflow-y: hidden; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; text-align: center; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;" bgcolor="rgb(255, 255, 255)" align="center">
  //                 <img src="http://placehold.it/250x150/78c5d6/fff/" alt="Image" class="grid-item-image" style="box-sizing: border-box; line-height: 150px; font-size: 50px; color: rgb(120, 197, 214); margin-bottom: 15px; width: 100%;">
  //                 <table class="grid-item-card-body" style="box-sizing: border-box;">
  //                   <tbody style="box-sizing: border-box;">
  //                     <tr style="box-sizing: border-box;">
  //                       <td class="grid-item-card-content" style="box-sizing: border-box; font-size: 13px; color: rgb(111, 119, 125); padding-top: 0px; padding-right: 10px; padding-bottom: 20px; padding-left: 10px; width: 100%; line-height: 20px;" width="100%">
  //                         <h1 class="card-title" style="box-sizing: border-box;  font-weight: 300; color: rgb(68, 68, 68);">Title here
  //                         </h1>
  //                         <p class="card-text" style="box-sizing: border-box;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
  //                         </p>
  //                       </td>
  //                     </tr>
  //                   </tbody>
  //                 </table>
  //               </td>
  //             </tr>
  //           </tbody>
  //         </table>
  //       </td>
  //     </tr>
  //   </tbody>
  // </table>
  // `,
  //   },

  //   {
  //     category: "Structures",
  //     label: "List Items",
  //     attributes: { class: "fa fa-th-list" },
  //     content: `<table class="list-item" style="box-sizing: border-box; height: auto; width: 100%; margin-top: 0px; margin-right: auto; margin-bottom: 10px; margin-left: auto; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;" width="100%">
  //   <tbody style="box-sizing: border-box;">
  //     <tr style="box-sizing: border-box;">
  //       <td class="list-item-cell" style="box-sizing: border-box; background-color: rgb(255, 255, 255); border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; overflow-x: hidden; overflow-y: hidden; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;" bgcolor="rgb(255, 255, 255)">
  //         <table class="list-item-content" style="box-sizing: border-box;  margin-top: 0px; margin-right: auto; margin-bottom: 0px; margin-left: auto; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px; height: 150px; width: 100%;" width="100%" height="150">
  //           <tbody style="box-sizing: border-box;">
  //             <tr class="list-item-row" style="box-sizing: border-box;">
  //               <td class="list-cell-left" style="box-sizing: border-box; width: 30%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;" width="30%">
  //                 <img src="http://placehold.it/150x150/78c5d6/fff/" alt="Image" class="list-item-image" style="box-sizing: border-box; color: rgb(217, 131, 166); font-size: 45px; width: 100%;">
  //               </td>
  //               <td class="list-cell-right" style="box-sizing: border-box; width: 70%; color: rgb(111, 119, 125); font-size: 13px; line-height: 20px; padding-top: 10px; padding-right: 20px; padding-bottom: 0px; padding-left: 20px;" width="70%">
  //                 <h1 class="card-title" style="box-sizing: border-box;  font-weight: 300; color: rgb(68, 68, 68);">Title here
  //                 </h1>
  //                 <p class="card-text" style="box-sizing: border-box;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
  //                 </p>
  //               </td>
  //             </tr>
  //           </tbody>
  //         </table>
  //       </td>
  //     </tr>
  //   </tbody>
  // </table>
  // <table class="list-item" style="box-sizing: border-box; height: auto; width: 100%; margin-top: 0px; margin-right: auto; margin-bottom: 10px; margin-left: auto; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;" width="100%">
  //   <tbody style="box-sizing: border-box;">
  //     <tr style="box-sizing: border-box;">
  //       <td class="list-item-cell" style="box-sizing: border-box; background-color: rgb(255, 255, 255); border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; overflow-x: hidden; overflow-y: hidden; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;" bgcolor="rgb(255, 255, 255)">
  //         <table class="list-item-content" style="box-sizing: border-box;  margin-top: 0px; margin-right: auto; margin-bottom: 0px; margin-left: auto; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px; height: 150px; width: 100%;" width="100%" height="150">
  //           <tbody style="box-sizing: border-box;">
  //             <tr class="list-item-row" style="box-sizing: border-box;">
  //               <td class="list-cell-left" style="box-sizing: border-box; width: 30%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;" width="30%">
  //                 <img src="http://placehold.it/150x150/78c5d6/fff/" alt="Image" class="list-item-image" style="box-sizing: border-box; color: rgb(217, 131, 166); font-size: 45px; width: 100%;">
  //               </td>
  //               <td class="list-cell-right" style="box-sizing: border-box; width: 70%; color: rgb(111, 119, 125); font-size: 13px; line-height: 20px; padding-top: 10px; padding-right: 20px; padding-bottom: 0px; padding-left: 20px;" width="70%">
  //                 <h1 class="card-title" style="box-sizing: border-box;  font-weight: 300; color: rgb(68, 68, 68);">Title here
  //                 </h1>
  //                 <p class="card-text" style="box-sizing: border-box;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
  //                 </p>
  //               </td>
  //             </tr>
  //           </tbody>
  //         </table>
  //       </td>
  //     </tr>
  //   </tbody>
  // </table>
  // `,
  //   },
];

export const styleManager = {
  appendTo: "#styles-container",
  sectors: [
    // { name: "Selected" },
    {
      name: "General Settings",
      open: false,
      buildProps: [
        "width",
        "max-width",
        "max-height",
        "height",
        "padding",
        "margin",
        "display",
        // "border",
        // "border-radius",
      ],
      properties: [
        {
          type: "integer",
          name: "Width",
          property: "width",
          units: ["px", "%", "rem"],
          default: "auto",
          min: 0,
        },
        {
          id: "display-prop-id",
          type: "select",
          name: "display",
          property: "display",
          options: [
            { id: "block", label: "Block" },
            { id: "inline", label: "Inline" },
            { id: "inline-block", label: "Inline-Block" },
            // { id: "flex", label: "Flex" },
            { id: "none", label: "None" },
          ],
          default: "block",
        },
      ],
    },
    {
      name: "Content Settings",
      open: false,
      buildProps: [
        "color",
        "font-size",
        "font-family",
        "text-align",
        "vertical-align",
        "line-height",
      ],
      properties: [
        {
          type: "select",
          name: "Vertical align",
          property: "vertical-align",
          options: [
            { id: "baseline", label: "baseline" },
            { id: "top", label: "top" },
            { id: "middle", label: "middle" },
            // { id: "flex", label: "Flex" },
            { id: "bottom", label: "bottom" },
          ],
          default: "baseline",
        },
      ],
    },

    {
      name: "Border",

      open: false,

      buildProps: [
        "border",
        "border-top",
        "border-left",
        "border-right",
        "border-bottom",
        "border-radius",
      ],

      properties: [
        {
          property: "border-top",
          type: "composite",
          properties: [
            {
              name: "Width",
              type: "integer",
              units: ["px", "em", "rem"],
              property: "border-top-width",
            },
            {
              name: "Style",
              type: "select",
              property: "border-top-style",
              options: [
                { value: "none" },
                { value: "solid" },
                { value: "dotted" },
                { value: "dashed" },
                { value: "double" },
                { value: "groove" },
                { value: "ridge" },
                { value: "inset" },
                { value: "outset" },
              ],
            },
            { name: "Color", type: "color", property: "border-top-color" },
          ],
        },

        {
          property: "border-left",
          type: "composite",
          properties: [
            {
              name: "Width",
              type: "integer",
              units: ["px", "em", "rem"],
              property: "border-left-width",
            },
            {
              name: "Style",
              type: "select",
              property: "border-left-style",
              options: [
                { value: "none" },
                { value: "solid" },
                { value: "dotted" },
                { value: "dashed" },
                { value: "double" },
                { value: "groove" },
                { value: "ridge" },
                { value: "inset" },
                { value: "outset" },
              ],
            },
            { name: "Color", type: "color", property: "border-left-color" },
          ],
        },
        {
          property: "border-right",
          type: "composite",
          properties: [
            {
              name: "Width",
              type: "integer",
              units: ["px", "em", "rem"],
              property: "border-right-width",
            },
            {
              name: "Style",
              type: "select",
              property: "border-right-style",
              options: [
                { value: "none" },
                { value: "solid" },
                { value: "dotted" },
                { value: "dashed" },
                { value: "double" },
                { value: "groove" },
                { value: "ridge" },
                { value: "inset" },
                { value: "outset" },
              ],
            },
            { name: "Color", type: "color", property: "border-right-color" },
          ],
        },

        {
          property: "border-bottom",
          type: "composite",
          properties: [
            {
              name: "Width",
              type: "integer",
              units: ["px", "em", "rem"],
              property: "border-bottom-width",
            },
            {
              name: "Style",
              type: "select",
              property: "border-bottom-style",
              options: [
                { value: "none" },
                { value: "solid" },
                { value: "dotted" },
                { value: "dashed" },
                { value: "double" },
                { value: "groove" },
                { value: "ridge" },
                { value: "inset" },
                { value: "outset" },
              ],
            },
            { name: "Color", type: "color", property: "border-bottom-color" },
          ],
        },
      ],
    },

    {
      name: "Background",
      open: true,
      buildProps: [
        "background-color",
        "background-image",
        "background-repeat",
        "background-position",
        "background-size",
        "background-attachment",
      ],
      properties: [
        {
          name: "Background Color",
          property: "background-color",
          type: "color",
        },
        {
          name: "Repeat",
          property: "background-repeat",
          type: "radio",
          defaults: "no-repeat",
          list: [
            {
              value: "no-repeat",
              name: "None",
              className: "fa fa-ban",
            },
            {
              value: "repeat",
              name: "Tile",
              className: "fa fa-repeat",
            },
            {
              value: "repeat-x",
              name: "Horizontally",
              className: "fa fa-repeat fa-flip-horizontal",
            },
            {
              value: "repeat-y",
              name: "Vertically",
              className: "fa fa-repeat fa-flip-vertical",
            },
          ],
        },
        {
          name: "Position",
          property: "background-position",
          type: "select",
          defaults: "top left",
          list: [
            {
              value: "top left",
              name: "Top Left",
            },
            {
              value: "top center",
              name: "Top Center",
            },
            {
              value: "top right",
              name: "Top Right",
            },
            {
              value: "center left",
              name: "Center Left",
            },
            {
              value: "center center",
              name: "Center Center",
            },
            {
              value: "center right",
              name: "Center Right",
            },
            {
              value: "bottom left",
              name: "Bottom Left",
            },
            {
              value: "bottom center",
              name: "Bottom Center",
            },
            {
              value: "bottom right",
              name: "Bottom Right",
            },
          ],
        },
        {
          name: "Size",
          property: "background-size",
          type: "radio",
          defaults: "cover",
          list: [
            {
              value: "cover",
              name: "Cover",
            },
            {
              value: "contain",
              name: "Contain",
            },
            {
              value: "initial",
              name: "Initial",
            },
          ],
        },

        {
          name: "Attach",
          property: "background-attachment",
          type: "select",
          defaults: "scroll",
          list: [
            {
              value: "scroll",
              name: "Scroll",
            },
            {
              value: "fixed",
              name: "Fixed",
            },
          ],
        },
      ],
    },
  ],
};

export const deviceManager = {
  devices: [
    {
      name: "Desktop",
      width: "",
    },
    {
      name: "Tablet",
      width: "768px",
      widthMedia: "1024px",
    },

    {
      name: "Mobile",
      width: "320px",
      widthMedia: "480px",
    },
  ],
};

// const openExport = "export-template";
// const openStyleManager = "open-sm";
// const openTraits = "open-tm";
// const openLayers = "open-layers";
// const openBlocks = "open-blocks";
// const activateOutline = "sw-visibility";
// const activateFullscreen = "fullscreen";
// const activatePreview = "preview";
const iconStyle = 'style="display: block; max-width: 22px"';

export const panels = {
  defaults: [
    {
      id: "basic-actions",
      el: ".panel__basic-actions",
      buttons: [
        {
          id: "visibility",
          active: true, // active by default
          className: "btn-toggle-borders",
          label: '<i class="bi bi-border adding-hover"></i>',
          command: "sw-visibility", // Built-in command
        },
      ],
    },
    {
      id: "panel-export",
      el: ".edit_inner_html",
      buttons: [
        {
          id: "open-code",
          label: '<i class="fa fa-file-code-o"></i>',
          command: "open-code",
          active: false,
        },
      ],
    },
    {
      id: "import-html",
      el: ".import_html",
      buttons: [
        {
          id: "import-html",
          label: `<svg ${iconStyle} viewBox="0 0 24 24">
                   <path fill="currentColor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
               </svg>`,
          command: function command(editor) {},
          active: false,
        },
      ],
    },
    {
      id: "panel-devices-clear",
      el: ".panel__basic_clear",
      buttons: [
        {
          id: "clear",
          label: '<i class="fa bi-trash adding-hover"></i>',
          command: cmdClear,
        },
      ],
    },

    {
      id: " panel-basic-clear-edit",
      el: ".panel__basic_clear_edit",
      buttons: [
        {
          id: "clear",
          label: "<p>Clear Canvas</p>",
          className: "text-clear-canvas",
          command: cmdClear,
        },
      ],
    },
    {
      id: "panel__basic-export",
      el: ".panel__basic_export",
      buttons: [
        {
          id: "export",
          label: '<i class="fa bi-trash adding-hover"></i>',
          command: function command(editor) {
            console.log(editor);
          },
        },
      ],
    },
    {
      id: "edit_fullscreen",
      el: ".edit_fullscreen",
      buttons: [
        {
          id: "clear",
          label: `<svg ${iconStyle} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z" />
                </svg>`,
          command: function command(editor) {
            let elem = document.getElementById("fullscreen");
            if (
              !document.fullscreenElement &&
              !document.mozFullScreenElement &&
              !document.webkitFullscreenElement &&
              !document.msFullscreenElement
            ) {
              if (elem.requestFullscreen) {
                elem.requestFullscreen();
              } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
              } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
              } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
              }
            } else {
              if (document.exitFullscreen) {
                document.exitFullscreen();
              } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
              } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
              } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
              }
            }
          },
          active: false,
        },
      ],
    },
    {
      id: "panel-devices-redo",
      el: ".panel__basic_redo",
      buttons: [
        {
          id: "undo",
          className: "fa fa-undo icon-undo adding-hover",
          command: function command(editor, sender) {
            sender.set("active", 0);
            editor.UndoManager.undo(1);
          },
          attributes: {
            title: "Undo (CTRL/CMD + Z)",
          },
        },
        {
          id: "redo",
          className: "fa fa-repeat icon-redo adding-hover",

          command: function command(editor, sender) {
            sender.set("active", 0);
            editor.UndoManager.redo(1);
          },
          attributes: {
            title: "Redo (CTRL/CMD + Y)",
          },
        },
      ],
    },

    {
      id: "panel-devices",
      el: ".panel__devices",
      buttons: [
        {
          id: "device-desktop",
          label: `<svg ${iconStyle} viewBox="0 0 24 24">
                   <path fill="currentColor" d="M21,16H3V4H21M21,2H3C1.89,2 1,2.89 1,4V16A2,2 0 0,0 3,18H10V20H8V22H16V20H14V18H21A2,2 0 0,0 23,16V4C23,2.89 22.1,2 21,2Z" />
                </svg>`,
          command: "set-device-desktop",

          togglable: false,
          active: true,
        },
        {
          id: "device-tablet",
          label: `<svg ${iconStyle} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19,18H5V6H19M21,4H3C1.89,4 1,4.89 1,6V18A2,2 0 0,0 3,20H21A2,2 0 0,0 23,18V6C23,4.89 22.1,4 21,4Z" />
                </svg>`,
          command: "set-device-tablet",
        },

        {
          id: "device-mobile",
          label: `<svg ${iconStyle} viewBox="0 0 24 24">
                   <path fill="currentColor" d="M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3C19,1.89 18.1,1 17,1Z" />
                 </svg>`,
          command: "set-device-mobile",
        },
      ],
    },
    // {
    //   id: "views",
    //   buttons: [
    //     {
    //       id: openStyleManager,
    //       command: openStyleManager,
    //       active: true,
    //       label: `<svg ${iconStyle} viewBox="0 0 24 24">
    //           <path fill="currentColor" d="M20.71,4.63L19.37,3.29C19,2.9 18.35,2.9 17.96,3.29L9,12.25L11.75,15L20.71,6.04C21.1,5.65 21.1,5 20.71,4.63M7,14A3,3 0 0,0 4,17C4,18.31 2.84,19 2,19C2.92,20.22 4.5,21 6,21A4,4 0 0,0 10,17A3,3 0 0,0 7,14Z" />
    //       </svg>`,
    //     },
    //     {
    //       id: openTraits,
    //       command: openTraits,
    //       label: `<svg ${iconStyle} viewBox="0 0 24 24">
    //         <path fill="currentColor" d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
    //     </svg>`,
    //     },
    //     {
    //       id: openLayers,
    //       command: openLayers,
    //       label: `<svg ${iconStyle} viewBox="0 0 24 24">
    //         <path fill="currentColor" d="M12,16L19.36,10.27L21,9L12,2L3,9L4.63,10.27M12,18.54L4.62,12.81L3,14.07L12,21.07L21,14.07L19.37,12.8L12,18.54Z" />
    //     </svg>`,
    //     },
    //     {
    //       id: openBlocks,
    //       command: openBlocks,
    //       label: `<svg ${iconStyle} viewBox="0 0 24 24">
    //         <path fill="currentColor" d="M17,13H13V17H11V13H7V11H11V7H13V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
    //     </svg>`,
    //     },
    //   ],
    // },
  ],
};
