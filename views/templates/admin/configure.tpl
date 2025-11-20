{*
* 2007-2025 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author    PrestaShop SA <contact@prestashop.com>
*  @copyright 2007-2025 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*}

{*
* Free Shipping Progress Bar Module
*}

<div class="panel">
	<div class="panel-heading">
		<i class="icon icon-truck"></i> {l s='Free Shipping Progress Bar' mod='freeshippingprogress'}
	</div>

	<div class="panel-body">
		<div class="row">
			<div class="col-md-12">
				<p>
					<strong>{l s='This module displays a progress bar showing how much more customers need to spend to qualify for free shipping.' mod='freeshippingprogress'}</strong>
				</p>
				<p>
					{l s='You can customize the appearance and messages below.' mod='freeshippingprogress'}
				</p>
			</div>
		</div>
	</div>

	<div class="panel-footer">
		<a href="{$link->getAdminLink('AdminDashboard')|escape:'html':'UTF-8'}" class="btn btn-default">
			<i class="process-icon-cancel"></i> {l s='Cancel' mod='freeshippingprogress'}
		</a>
		<button type="submit" name="submitFreeShippingProgressModule" class="btn btn-default pull-right">
			<i class="process-icon-save"></i> {l s='Save' mod='freeshippingprogress'}
		</button>
	</div>
</div>

<div class="panel">
	<div class="panel-heading">
		<i class="icon icon-eye"></i> {l s='Preview' mod='freeshippingprogress'}
	</div>

	<div class="panel-body">
		<div class="free-shipping-progress-container">
			<div class="free-shipping-progress-message">
				{l s='Add €XX.XX to your cart to get free shipping!' mod='freeshippingprogress'}
			</div>
			<div class="free-shipping-progress-bar-outer" style="background-color: #f5f5f5">
				<div class="free-shipping-progress-bar-inner" style="width: 60%; background-color: #2fb5d2"></div>
			</div>
		</div>

		<div class="free-shipping-progress-container">
			<div class="free-shipping-progress-message free-shipping-progress-success">
				{l s='Congratulations! You\'ve unlocked free shipping!' mod='freeshippingprogress'}
			</div>
			<div class="free-shipping-progress-bar-outer" style="background-color: #f5f5f5">
				<div class="free-shipping-progress-bar-inner" style="width: 100%; background-color: #2fb5d2"></div>
			</div>
		</div>
	</div>
</div>