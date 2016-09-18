<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
final class HomeController
{
    /**
     * @Template()
     *
     * @return array
     */
    public function homeAction()
    {
        return [];
    }
}
